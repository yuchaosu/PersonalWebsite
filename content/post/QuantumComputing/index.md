---
title: "Understanding Quantum Computing from the Math Up"
summary: A self-contained walkthrough of the mathematical foundations of quantum computing — from complex numbers and the Bloch sphere all the way to variational algorithms on near-term hardware.
date: 2026-05-28
authors:
  - admin
tags:
  - Quantum Computing
  - Math
  - Physics
  - Tutorial
math: true
---


We start with the simplest ingredients — complex numbers and vectors — and end with variational quantum algorithms running on today's noisy hardware. Every section depends on the one before it, so I recommend reading in order.

<!--more-->

---

## 1. Complex Numbers: The Language of Quantum Amplitudes

A complex number has the form $z = a + bi$ where $i = \sqrt{-1}$. Quantum mechanics is built on complex numbers because they naturally encode two pieces of information at once: a **magnitude** and a **phase**.

### Modulus and modulus squared

The **modulus** (absolute value) of $z = a + bi$ is:

$$|z| = \sqrt{a^2 + b^2}$$

The **modulus squared** is:

$$|z|^2 = a^2 + b^2 = z \cdot z^*$$

where $z^* = a - bi$ is the complex conjugate. The modulus squared is the single most important operation in quantum mechanics — it turns amplitudes into probabilities.

### Polar form and phase

Any complex number can be written in polar form:

$$z = r\,e^{i\theta} = r(\cos\theta + i\sin\theta)$$

Here $r = |z|$ is the modulus and $\theta$ is the **phase angle**. The bridge is Euler's formula:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

The factor $e^{i\theta}$ lives on the unit circle in the complex plane — its modulus is always 1. It is called a **phase factor**: it rotates a complex number without changing its size.

This duality — magnitude *and* angle — is exactly what quantum amplitudes need. A probability (a real non-negative number) can only tell you "how likely." A complex amplitude tells you "how likely" *and* "at what angle" — and that angle is what enables interference.

---

## 2. Vectors, Inner Products, and Dirac Notation

### Kets and bras

In Dirac notation a quantum state is written as a **ket** — a column vector of complex amplitudes:

$$|\psi\rangle = \begin{pmatrix} \alpha \\ \beta \end{pmatrix}, \quad \alpha, \beta \in \mathbb{C}$$

The corresponding **bra** is the conjugate transpose (row vector):

$$\langle\psi| = \begin{pmatrix} \alpha^* & \beta^* \end{pmatrix}$$

### Inner product

The **inner product** (bra times ket) yields a scalar measuring the overlap between two states:

$$\langle\psi|\psi\rangle = \alpha^*\alpha + \beta^*\beta = |\alpha|^2 + |\beta|^2$$

When this equals 1, the state is **normalized** — a physical requirement, as we will see next.

---

## 3. The Qubit

A classical bit is either 0 or 1. A **qubit** is a two-dimensional complex vector that can be in a superposition of both:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

where the computational basis states are:

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

The coefficients $\alpha$ and $\beta$ are called **amplitudes**.

### The Born rule (normalization)

The modulus squared of each amplitude gives the probability of measuring that outcome:

- Probability of measuring 0: $|\alpha|^2$
- Probability of measuring 1: $|\beta|^2$

Since probabilities must sum to 1:

$$|\alpha|^2 + |\beta|^2 = 1 \quad \Longleftrightarrow \quad \langle\psi|\psi\rangle = 1$$

This is why a quantum state must be a **unit-length vector**. The familiar factor of $1/\sqrt{2}$ in the state $(|0\rangle + |1\rangle)/\sqrt{2}$ is simply the normalization constant: $|1/\sqrt{2}|^2 + |1/\sqrt{2}|^2 = 1$.

### Two kinds of phase

Write the most general single-qubit state as $|\psi\rangle = e^{i\gamma}(\alpha'|0\rangle + e^{i\varphi}\beta'|1\rangle)$.

- **Global phase** ($e^{i\gamma}$): multiplies the *entire* state. It cancels out in every measurement probability ($|e^{i\gamma}\alpha'|^2 = |\alpha'|^2$), so it has **no physical meaning**. We are free to drop it.
- **Relative phase** ($e^{i\varphi}$): the phase difference *between* $|0\rangle$ and $|1\rangle$. This is **physically observable** — it determines the outcomes of measurements in bases other than $Z$, and it is exactly what decoherence destroys.

After removing the global phase, any single-qubit state can be parametrized by just two real numbers:

$$|\psi\rangle = \cos\frac{\theta}{2}\,|0\rangle + e^{i\varphi}\sin\frac{\theta}{2}\,|1\rangle, \quad \theta \in [0, \pi],\ \varphi \in [0, 2\pi)$$

Two angles — exactly what you need to specify a point on a sphere.

---

## 4. The Bloch Sphere

Since a single-qubit pure state is described by two angles $(\theta, \varphi)$, it maps to a point on the surface of a unit sphere — the **Bloch sphere**.

- $\theta$ (polar angle, 0 to $\pi$): controls the balance between $|0\rangle$ and $|1\rangle$
- $\varphi$ (azimuthal angle, 0 to $2\pi$): the relative phase

### Notable points

| Location | Angles | State |
|---|---|---|
| North pole | $\theta = 0$ | $\|0\rangle$ |
| South pole | $\theta = \pi$ | $\|1\rangle$ |
| Equator $+x$ | $\theta = \pi/2,\ \varphi = 0$ | $\|+\rangle = (\|0\rangle + \|1\rangle)/\sqrt{2}$ |
| Equator $-x$ | $\theta = \pi/2,\ \varphi = \pi$ | $\|-\rangle = (\|0\rangle - \|1\rangle)/\sqrt{2}$ |
| Equator $\pm y$ | $\theta = \pi/2,\ \varphi = \pm\pi/2$ | Superpositions with $\pm i$ phase |

The states $|+\rangle$ and $|-\rangle$ sit at opposite points on the equator. They share the same $\theta$ (so $Z$-basis measurements give 50/50 for both), but they differ by $\varphi = \pi$ — which means an $X$-basis measurement can tell them apart perfectly. This is the geometric picture of relative phase.

### Two key correspondences

1. **Pure states live on the surface; mixed states live inside.** A perfectly coherent qubit is a point on the sphere (Bloch vector length = 1). As decoherence degrades the state, the point shrinks toward the center. At the center sits the maximally mixed state — 50/50 $|0\rangle$ and $|1\rangle$ with no phase information left. The distance from the center encodes "how much coherence remains."

2. **Quantum gates are rotations.** The $X$ gate rotates 180° around the $x$-axis ($|0\rangle \leftrightarrow |1\rangle$). The $Z$ gate rotates 180° around the $z$-axis ($|+\rangle \leftrightarrow |-\rangle$, i.e., it flips the relative phase). $R_X(\theta)$ and $R_Z(\theta)$ are partial rotations around their respective axes.

### Try it yourself

Use the [interactive Bloch sphere tool](/quantum-viz/) to build intuition. Start at $|0\rangle$ (north pole), apply an $H$ gate to move to the equator, then try $Z$, $S$, $T$ to see how phase rotations work.

---

## 5. Measurement and Expectation Values

### Measurement

Quantum measurement forces a qubit to collapse into one of the basis states, probabilistically. Measuring $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ in the $Z$-basis:

- With probability $|\alpha|^2$: result is "0," state collapses to $|0\rangle$
- With probability $|\beta|^2$: result is "1," state collapses to $|1\rangle$

A single measurement gives a single random bit — it reveals nothing about $\alpha$ or $\beta$ individually. To learn about the state, you must prepare it many times and collect statistics. This leads to the concept of the expectation value.

### Expectation value

The expectation value is the weighted average of measurement outcomes. Assign eigenvalue $+1$ to outcome $|0\rangle$ and $-1$ to $|1\rangle$ (these are the eigenvalues of $Z$):

$$\langle Z \rangle = (+1) \cdot P(0) + (-1) \cdot P(1) = |\alpha|^2 - |\beta|^2$$

For any observable (Hermitian operator) $A$, the expectation value is given by the unified formula:

$$\boxed{\langle A \rangle = \langle\psi|A|\psi\rangle}$$

Read right to left: apply $A$ to $|\psi\rangle$ to get a new vector, then take the inner product with $\langle\psi|$. The result is always a real number.

### Worked example

Take $|\psi\rangle = |+\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix}$.

**Computing $\langle Z \rangle$:**

$$Z|\psi\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\-1\end{pmatrix}, \qquad \langle Z\rangle = \frac{1}{2}(1 \cdot 1 + 1 \cdot (-1)) = 0$$

This makes sense: $|+\rangle$ measured in the $Z$-basis gives 50/50 outcomes, so the average of $\{+1, -1\}$ is 0.

**Computing $\langle X \rangle$:**

$$X|\psi\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1\\1\end{pmatrix} = |\psi\rangle, \qquad \langle X\rangle = \langle\psi|\psi\rangle = 1$$

This also makes sense: $|+\rangle$ is the $+1$ eigenstate of $X$, so $X$-basis measurement yields $+1$ with certainty.

Together with $\langle Y \rangle = 0$, these three values $(\langle X \rangle, \langle Y \rangle, \langle Z \rangle) = (1, 0, 0)$ give the Bloch sphere coordinates — pointing along the $+x$ axis, exactly where $|+\rangle$ lives.

### Why expectation values matter

1. **They are the experimentally accessible quantity.** Single shots are random; repeated measurements converge to $\langle A \rangle$. This is also why VQE is measurement-hungry — suppressing statistical noise requires many repetitions.
2. **They translate quantum states into physical numbers.** If $H$ is a Hamiltonian, $\langle H \rangle$ is the average energy. VQE's cost function is an expectation value.
3. **They connect directly to probabilities.** For an observable with eigenvalues $\pm 1$: $P_{+1} = (1 + \langle A \rangle)/2$.
4. **They *are* the Bloch sphere coordinates.** $(\langle X \rangle, \langle Y \rangle, \langle Z \rangle)$ locates the state on the sphere, and $\sqrt{\langle X \rangle^2 + \langle Y \rangle^2 + \langle Z \rangle^2}$ measures purity (1 for pure, smaller for mixed).

---

## 6. Phase Information: What It Means to Have It (or Lose It)

Now that we have the mathematical tools, we can understand precisely what "phase" means and why losing it is catastrophic.

### Where is the phase?

A general superposition:

$$|\psi\rangle = \frac{1}{\sqrt{2}}\left(|0\rangle + e^{i\varphi}|1\rangle\right)$$

The relative phase $\varphi$ distinguishes $|+\rangle$ ($\varphi=0$) from $|-\rangle$ ($\varphi=\pi$). In the $Z$-basis both measure as 50/50, but in the $X$-basis they give opposite deterministic outcomes. The difference is entirely in $\varphi$.

### Seeing decoherence through the density matrix

A pure superposition state has the density matrix:

$$\rho = \frac{1}{2}\begin{pmatrix} 1 & e^{-i\varphi} \\ e^{i\varphi} & 1 \end{pmatrix}$$

- The **diagonal elements** (0.5, 0.5) are the populations — the probabilities of finding $|0\rangle$ or $|1\rangle$.
- The **off-diagonal elements** $e^{\pm i\varphi}/2$ are the **coherences** — they carry the phase information.

When the environment randomizes the phase (dephasing), we average over $\varphi$, and the off-diagonals vanish:

$$\rho \;\longrightarrow\; \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$

This is a **classical probability mixture** — 50% $|0\rangle$, 50% $|1\rangle$, with zero interference capability.

> **Precisely:** "Losing phase information" = the off-diagonal terms of the density matrix decay to zero while the diagonal (populations) stay unchanged. This is exactly the $T_\varphi$ process. If the diagonals also change ($|1\rangle$ population decaying to $|0\rangle$), that is the $T_1$ process.

### Coherent vs. incoherent: the experimental distinction

| | System A: pure superposition $(|0\rangle+|1\rangle)/\sqrt{2}$ | System B: classical mixture 50% $|0\rangle$ + 50% $|1\rangle$ |
|---|---|---|
| $Z$-basis measurement | 50/50 | 50/50 (indistinguishable!) |
| Hadamard then measure | **100% gives 0** | **50/50** |
| Math object | Amplitudes $\alpha, \beta$ (complex) | Probabilities $p_0, p_1$ (real) |
| How they combine | Amplitudes add, *then* square | Probabilities add directly |
| Interference? | Yes (constructive / destructive) | No |
| Density matrix | Non-zero off-diagonals | Off-diagonals are zero |
| Bloch sphere | On the surface | Inside (center at worst) |

System A, passed through a Hadamard gate, undergoes **destructive interference** — the $|1\rangle$ amplitude cancels perfectly. System B has no phase relationship, so probabilities just average. The fundamental distinction is **amplitude addition vs. probability addition**.

> **Why this matters for quantum computing:** Every quantum speedup (Shor, Grover, phase estimation) relies on *controlled interference* — amplifying the correct answer and canceling the wrong ones. Once phase information is lost, a quantum computer degrades into an expensive random number generator.

---

## 7. Tensor Products: Building Multi-Qubit Systems

The tensor product ($\otimes$, or Kronecker product for matrices) combines subsystems into a joint system. **Dimensions multiply, they do not add.**

### Vectors

Each component of the first vector multiplies the *entire* second vector:

$$\begin{pmatrix} a \\ b \end{pmatrix} \otimes \begin{pmatrix} c \\ d \end{pmatrix} = \begin{pmatrix} ac \\ ad \\ bc \\ bd \end{pmatrix}$$

For example, $|0\rangle \otimes |1\rangle$ (written $|01\rangle$):

$$\begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}$$

The four components correspond to the amplitudes of $|00\rangle, |01\rangle, |10\rangle, |11\rangle$. For $n$ qubits the state vector has $2^n$ dimensions — this exponential growth is the source of quantum computing's potential power.

### Matrices

Each element of the first matrix is replaced by that element times the entire second matrix:

$$A \otimes B = \begin{pmatrix} a_{11}B & a_{12}B \\ a_{21}B & a_{22}B \end{pmatrix}$$

For example, the Pauli string $Z \otimes X$:

$$Z \otimes X = \begin{pmatrix} 1 \cdot X & 0 \cdot X \\ 0 \cdot X & -1 \cdot X \end{pmatrix} = \begin{pmatrix} 0 & 1 & 0 & 0 \\ 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & -1 \\ 0 & 0 & -1 & 0 \end{pmatrix}$$

### The mixed-product property

This is the most useful identity in multi-qubit calculations:

$$(A \otimes B)(|\psi\rangle \otimes |\phi\rangle) = (A|\psi\rangle) \otimes (B|\phi\rangle)$$

Each factor acts only on its own subsystem. For instance, $(Z \otimes X)|01\rangle = (Z|0\rangle) \otimes (X|1\rangle) = |0\rangle \otimes |0\rangle = |00\rangle$ — no need to construct the $4 \times 4$ matrix.

Another frequently used rule:

$$(A \otimes B)(C \otimes D) = (AC) \otimes (BD)$$

### Practical notes

- **Not commutative:** $A \otimes B \neq B \otimes A$. The ordering corresponds to qubit labeling and cannot be swapped.
- **Associative:** $(A \otimes B) \otimes C = A \otimes (B \otimes C)$, so grouping does not matter.

---

## 8. Pauli Strings: The Building Blocks of Quantum Observables

### The four Pauli matrices

$$I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix},\quad X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix},\quad Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix},\quad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

- $I$: identity, does nothing.
- $X$: bit flip ($X|0\rangle = |1\rangle$), 180° rotation around the Bloch sphere $x$-axis.
- $Z$: phase flip ($Z|1\rangle = -|1\rangle$), 180° rotation around the $z$-axis.
- $Y = iXZ$: 180° rotation around the $y$-axis.

These four matrices form a **basis** for all $2 \times 2$ Hermitian matrices. Any single-qubit observable can be written as a linear combination of $\{I, X, Y, Z\}$.

### Pauli strings

An $n$-qubit **Pauli string** assigns one Pauli matrix to each qubit and connects them with tensor products:

$$P = \sigma_1 \otimes \sigma_2 \otimes \cdots \otimes \sigma_n, \qquad \sigma_i \in \{I, X, Y, Z\}$$

Examples (subscripts denote qubit index, omitted positions default to $I$):

- $Z_0 Z_1$ = $Z \otimes Z \otimes I$
- $X_1$ = $I \otimes X \otimes I$
- $Y_0 Z_2$ = $Y \otimes I \otimes Z$

A Pauli string is formally a $2^n \times 2^n$ matrix, but we almost always work with the compact notation — which is the whole point of using them.

### Why Pauli strings are central

1. **They are the building blocks of Hamiltonians.** Any $n$-qubit Hermitian operator can be uniquely decomposed as a weighted sum of Pauli strings: $H = \sum_i c_i P_i$. The $4^n$ Pauli strings form a complete orthogonal basis for the space of $2^n \times 2^n$ Hermitian matrices.

2. **Expectation values are easy to measure.** Measuring $\langle Z_0 Z_1 \rangle$ just requires checking parity. Measuring $\langle X \rangle$ or $\langle Y \rangle$ requires a basis-change gate before measuring as $Z$. So $\langle H \rangle$ is computed by measuring each Pauli term separately and taking the weighted sum.

3. **Exponentials decompose into standard gate circuits.** $e^{-i\theta P}$ for any Pauli string $P$ has a fixed circuit template (detailed in Section 10).

### Useful properties

- Every Pauli string is both **Hermitian** ($P = P^\dagger$) and **unitary** ($P^2 = I$), so its eigenvalues are $+1$ and $-1$ only.
- Any two Pauli strings either **commute** or **anti-commute** — this is the foundation of the stabilizer formalism and quantum error correction.
- **Weight**: the number of non-$I$ factors. Higher weight means more expensive measurement and deeper circuits. (The notorious $Z$-tails of Jordan-Wigner are high-weight strings.)

---

## 9. Mapping Problems to Quantum Circuits

The goal is to recast a problem as **finding the ground state of some Hamiltonian $H$**. The mapping has three layers:

1. **Problem layer** — define what to optimize or solve.
2. **Hamiltonian layer** — write $H = \sum_i c_i P_i$ (a weighted sum of Pauli strings) such that the ground state of $H$ encodes the solution.
3. **Circuit layer** — translate state preparation and time evolution $e^{-iH}$ into concrete quantum gates.

### Example 1: QAOA for Max-Cut

**Encoding:** Each graph vertex gets one qubit. $|0\rangle$ = group A, $|1\rangle$ = group B.

**Hamiltonian:** For each edge $(i, j)$, the "reward for being cut" is:

$$\frac{1}{2}(1 - Z_i Z_j)$$

This equals 1 if qubits $i$ and $j$ are in different groups (one is $|0\rangle$, the other $|1\rangle$) and 0 if they are in the same group. The full cost Hamiltonian is:

$$H_C = \sum_{(i,j) \in E} \frac{1}{2}(1 - Z_i Z_j)$$

This is diagonal — every computational basis state is an eigenstate, and its eigenvalue equals the number of edges cut by that assignment. The ground state (maximum eigenvalue after sign flip, or minimum of $-H_C$) corresponds to the optimal cut.

**Circuit translation:**
- Initial state: apply Hadamard to all qubits to create $|+\rangle^{\otimes n}$.
- Problem layer $e^{-i\gamma Z_i Z_j}$: implement as CNOT$(i \to j)$ → $R_Z(2\gamma)$ on $j$ → CNOT$(i \to j)$.
- Mixing layer $e^{-i\beta H_B}$ with $H_B = \sum_i X_i$: apply $R_X(2\beta)$ to each qubit.
- Repeat for $p$ layers.

### Example 2: VQE for molecular simulation

This requires an extra step — a **fermion-to-qubit mapping** — because electrons are fermions with anti-commutation relations that bare qubit operators do not satisfy.

1. **Second-quantized Hamiltonian:** $H = \sum_{pq} h_{pq}\, a_p^\dagger a_q + \frac{1}{2}\sum_{pqrs} h_{pqrs}\, a_p^\dagger a_q^\dagger a_r a_s$, with coefficients computed classically.

2. **Fermion-to-qubit transform** (the key step):
   - **Jordan-Wigner**: most straightforward, but introduces long $Z$-tails — each creation/annihilation operator maps to a Pauli string whose weight scales as $O(n)$.
   - **Bravyi-Kitaev**: each operator involves only $O(\log n)$ qubits, producing shorter circuits.

   After this step, $H$ becomes a sum of Pauli strings $H = \sum_i c_i P_i$.

3. **Ansatz construction:** UCCSD (chemistry-inspired, accurate but deep circuits) or hardware-efficient ansatz (shallow but prone to barren plateaus).

4. **Measuring $\langle H \rangle$:** each Pauli term is measured independently (with appropriate basis rotations for $X$ and $Y$ terms), then results are combined with their coefficients.

### General technique: decomposing $e^{-iH}$ into gates

Regardless of the problem, the evolution operator must be broken into elementary gates. The core recipe is **Trotter decomposition + standard Pauli-string exponentiation**:

- When terms do not commute, use the Trotter approximation: $e^{-iHt} \approx \left[\prod_i e^{-i P_i t/n}\right]^n$.
- For a single Pauli string exponential $e^{-i\theta P}$, there is a fixed template:
  1. Single-qubit gates to rotate any non-$Z$ Paulis to $Z$.
  2. A cascade of CNOTs to collect parity onto one qubit.
  3. $R_Z(2\theta)$ on that qubit.
  4. Reverse the CNOTs and basis rotations.

---

## 10. The NISQ Era and Variational Algorithms

### What is "near-term quantum"?

The term **NISQ** (Noisy Intermediate-Scale Quantum) was coined by John Preskill in 2018 to describe the current generation of quantum hardware:

- **Noisy**: qubits have no error correction. Decoherence and gate errors (0.1%–1% per gate) accumulate directly in the output.
- **Intermediate-Scale**: roughly 50 to a few thousand physical qubits. Beyond ~50 qubits, classical computers struggle to simulate the system exactly — but the qubit count is still far too small to support full error correction.

| | NISQ (Near-term) | FTQC (Fault-tolerant) |
|---|---|---|
| Error correction | None | Full quantum error-correcting codes |
| Qubit count | 50 – few thousand (physical) | Millions physical → thousands logical |
| Circuit depth | Strictly limited by decoherence | Arbitrarily long in principle |
| Algorithms | Variational, sampling tasks | Shor's factoring, exact chemistry simulation |

The dividing line is **error correction**. NISQ occupies the awkward middle ground — too many qubits for classical simulation, too few for the overhead of error correction.

### The variational hybrid algorithm framework

All variational algorithms share a common skeleton — a feedback loop between a quantum processor and a classical optimizer:

1. Prepare a **parameterized quantum circuit** $U(\boldsymbol{\theta})$ acting on an initial state, producing a trial state $|\psi(\boldsymbol{\theta})\rangle$ (called the **ansatz**).
2. **Measure** the expectation value of the target Hamiltonian: $\langle\psi(\boldsymbol{\theta})|H|\psi(\boldsymbol{\theta})\rangle$ — this is the "cost."
3. A **classical optimizer** adjusts $\boldsymbol{\theta}$ to reduce the cost.
4. Repeat until convergence.

The design motivation: keep the quantum circuit shallow (avoiding decoherence) and offload the heavy iteration work to the noise-resilient classical computer. The theoretical justification is the **variational principle**: for any trial state, $\langle H \rangle \geq E_0$ (the ground state energy). So "minimize $\langle H \rangle$" is equivalent to "approximate the ground state."

### VQE and QAOA

| | VQE (Variational Quantum Eigensolver) | QAOA (Quantum Approximate Optimization) |
|---|---|---|
| Problem | Ground-state energy of a Hamiltonian | Approximate solution to combinatorial optimization |
| Applications | Quantum chemistry, materials science | Max-Cut, scheduling, routing |
| Ansatz structure | Flexible (UCCSD, hardware-efficient, etc.) | Fixed: alternating $H_C$ and $H_B$ layers |
| Parameter count | Many (grows with ansatz complexity) | Few (only $2p$ parameters for $p$ layers) |

QAOA has a physically motivated circuit structure — alternating applications of two unitaries:

$$|\psi(\boldsymbol{\gamma}, \boldsymbol{\beta})\rangle = e^{-i\beta_p H_B} e^{-i\gamma_p H_C} \cdots e^{-i\beta_1 H_B} e^{-i\gamma_1 H_C}\,|+\rangle^{\otimes n}$$

Here $H_C$ encodes the optimization objective (its ground state = the optimal solution) and $H_B = \sum_i X_i$ provides "mixing" — exploring the solution space. The integer $p$ is the number of alternating layers. QAOA can be viewed as VQE with a structured, problem-specific ansatz.

**Shared practical challenges:**
- Noise accumulation limits circuit depth.
- **Barren plateaus**: gradients can vanish exponentially in the number of qubits, making optimization intractable.
- Measurement overhead is significant — each expectation value requires thousands of shots.
- Whether NISQ algorithms offer genuine quantum advantage at practical scale remains an open question. The field is gradually shifting toward "early fault-tolerant" approaches.

---

## 11. Superconducting Qubits and Decoherence

With the mathematical framework in place, we can now understand the physical platform where much of today's quantum computing happens — and why maintaining coherence is so hard.

### Why superconducting qubits stay coherent (for a while)

Superconducting qubits are *not* especially long-lived — their coherence times (typically 100 $\mu$s to 1 ms) are short compared to trapped ions or neutral atoms. But they maintain coherence long enough to be useful, for specific physical reasons:

**The superconducting energy gap.** At cryogenic temperatures, electrons pair into Cooper pairs and condense into a superconducting state. Breaking a Cooper pair requires crossing a finite energy gap ($2\Delta$). Below this gap, there are simply no available electronic excitation states for energy to dissipate into. In normal metals, the continuous excitation spectrum means oscillating currents decay almost immediately. In a superconductor at low temperature, the qubit's operating frequency range is effectively "silent."

**Supporting factors:**
- **Macroscopic quantum coherence**: a superconducting qubit is a collective state of billions of Cooper pairs sharing a single wave function. The Josephson junction provides the nonlinearity needed to isolate two energy levels, while the rest of the circuit behaves like a clean LC oscillator.
- **Millikelvin operating temperatures**: at 10–20 mK, thermal photons at the qubit frequency (~5 GHz) are essentially absent ($k_B T \ll \hbar\omega$).
- **Circuit design against known noise**: the transmon design deliberately operates in a regime exponentially insensitive to charge noise.

### Coherence times: $T_1$, $T_2$, and dephasing

Coherence time measures how long a qubit preserves its "quantumness." There are two distinct timescales:

**$T_1$ (energy relaxation time):** the characteristic time for the qubit to decay from $|1\rangle$ to $|0\rangle$. Energy is genuinely lost to the environment (dielectric loss, quasiparticles, stray modes).

**$T_2$ (phase coherence time):** the characteristic time for the relative phase of a superposition to remain well-defined. Even without energy loss, environmental fluctuations can randomly shift the phase, causing the superposition to "blur out." This pure phase randomization is called **dephasing**, with characteristic time $T_\varphi$.

The three are related by:

$$\frac{1}{T_2} = \frac{1}{2T_1} + \frac{1}{T_\varphi}$$

Energy relaxation necessarily causes some dephasing (the $1/2T_1$ term), but additional pure dephasing mechanisms — typically low-frequency noise ($1/f$ noise, flux fluctuations, charge fluctuations) causing the qubit frequency to drift — contribute $1/T_\varphi$.

**Key detail:** $T_2 \leq 2T_1$ always. When $T_2 \approx 2T_1$, dephasing has been suppressed to its limit, and the remaining decoherence comes almost entirely from energy decay — a sign of excellent fabrication.

**Practical implications:** The number of gate operations per coherence time $\approx T_2 /$ single-gate time. With single gates at 20–50 ns and $T_2 \approx 100\ \mu$s, a circuit can in principle run a few thousand gates — but each gate also has finite error, so fault-tolerant quantum computing requires error correction to break through this barrier.

### What still causes decoherence

- Two-level systems (TLS) in amorphous oxide layers at interfaces
- Quasiparticles generated by stray infrared photons or cosmic rays
- Dielectric loss in the substrate
- Stray mode coupling in packaging

Over the past two decades, these have been identified and systematically suppressed one by one. Coherence times have improved by roughly $10^5\times$ since the first charge qubit in 1999.

### Energy is the gift; phase is the struggle

The superconducting gap specifically suppresses high-frequency dissipation — the environment has no states to absorb energy at the qubit frequency, making $T_1$ relatively long. But dephasing does not require energy exchange. Slow environmental fluctuations can scramble the relative phase without crossing the gap, so $T_\varphi$ is harder to protect.

**Platform comparison ($T_2$ typical values):**

| Platform | Typical $T_2$ |
|---|---|
| Superconducting (transmon) | 50–500 $\mu$s |
| Semiconductor spin qubits | Tens of $\mu$s to milliseconds |
| Trapped ions | Seconds to tens of seconds |
| Neutral atoms | Seconds |
| Nuclear spins | Seconds to minutes |

Superconducting qubits couple strongly and operate fast — but that same strong coupling means they "hear" more noise.

> **$T_1$ is the gift from physics; $T_2$ is what engineers fight for.**

---

## 12. Tying It All Together

Here is how every piece connects into one coherent framework:

1. **Complex numbers** carry both a modulus and a phase → quantum amplitudes are complex, so quantum states inherently carry phase information.
2. **Modulus squared = probability**, and the total must be 1 → this is the normalization condition and the origin of the $\sqrt{2}$ factor.
3. **Relative phase** (not global phase) is physically observable → it is precisely what dephasing destroys.
4. **Two real angles** $(\theta, \varphi)$ fully describe a single-qubit state → the **Bloch sphere**, where phase is the azimuthal angle.
5. **Measurement** collapses the state randomly; a single shot carries minimal information → statistics over many runs are essential.
6. **Expectation values** $\langle A \rangle = \langle\psi|A|\psi\rangle$ are the stable, experimentally accessible quantities — they are the Bloch sphere coordinates, the VQE energy to optimize, and the bridge between "quantum state" and "experimental number."
7. **Pauli strings** decompose any observable or Hamiltonian; **tensor products** combine single-qubit spaces into multi-qubit spaces → these are the complete language for writing "a problem" as "a measurable, optimizable $\langle H \rangle$."

Pauli strings, tensor products, phase, decoherence — each is a link in the same chain, a different facet of the same framework.

### Directions to explore next

- **Bell states hands-on:** Start from the tensor product, work through a specific two-qubit state all the way to its expectation values, to see the multi-qubit formalism in action.
- **Quantum gates as Bloch sphere rotations:** Connect each common gate's matrix representation to its geometric meaning on the sphere.
- **Stabilizer formalism and error correction:** How Pauli string commutation relations lead to quantum error-correcting codes.

---

*These notes were compiled from a series of AI-assisted learning conversations, tracing a complete thread from superconducting decoherence to the mathematical foundations of quantum algorithms.*
