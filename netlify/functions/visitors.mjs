import { getStore } from "@netlify/blobs";

export default async (request) => {
  const store = getStore("visitor-locations");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method === "POST") {
    const ip =
      request.headers.get("x-nf-client-connection-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (ip === "unknown" || ip === "127.0.0.1") {
      return new Response(JSON.stringify({ ok: true }), { headers });
    }

    // Deduplicate: skip if this IP was already recorded today
    const today = new Date().toISOString().slice(0, 10);
    const ipHash = await hashIP(ip);
    const dedup = getStore("visitor-dedup");
    const dedupKey = `${ipHash}-${today}`;
    const seen = await dedup.get(dedupKey);
    if (seen) {
      return new Response(JSON.stringify({ ok: true, cached: true }), { headers });
    }

    try {
      const geo = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,country,lat,lon`)
        .then((r) => r.json());

      if (geo.status !== "success" || !geo.lat || !geo.lon) {
        return new Response(JSON.stringify({ ok: false }), { headers });
      }

      // Aggregate by city+country
      const locationKey = slugify(`${geo.city}-${geo.country}`);
      const existing = await store.get(locationKey, { type: "json" });

      if (existing) {
        existing.count += 1;
        await store.set(locationKey, JSON.stringify(existing));
      } else {
        await store.set(
          locationKey,
          JSON.stringify({
            lat: geo.lat,
            lng: geo.lon,
            city: geo.city,
            region: geo.regionName,
            country: geo.country,
            count: 1,
          })
        );
      }

      // Mark IP as seen today
      await dedup.set(dedupKey, "1");

      return new Response(JSON.stringify({ ok: true }), { headers });
    } catch {
      return new Response(JSON.stringify({ ok: false }), { status: 500, headers });
    }
  }

  // GET — return all visitor locations
  try {
    const { blobs } = await store.list();
    const locations = await Promise.all(
      blobs.map((blob) => store.get(blob.key, { type: "json" }))
    );
    return new Response(JSON.stringify(locations.filter(Boolean)), { headers });
  } catch {
    return new Response(JSON.stringify([]), { headers });
  }
};

export const config = {
  path: "/api/visitors",
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function hashIP(ip) {
  const data = new TextEncoder().encode(ip);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf).slice(0, 8))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
