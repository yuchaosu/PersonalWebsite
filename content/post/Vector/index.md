---
title: 矢量（Vector）
summary: 一些帮助更好理解矢量的想法。 Some thoughts to better understand vector.
date: 2025-09-27
math: true
authors:
  - admin
tags:
  - Teaching
  - Vector
  - Thinking
image:
  caption: 'Vector'
---

# 矢量（Vector）
*以下文字叙述仅适用于高中及以下阶段，不适用于高等教育。*

*The following only works in K12 level not for higher education.*

最近在使用梯度的时候，我发现自己其实并不真正理解矢量的概念。因此，我想写下自己对如何更好理解矢量的思考。

当我第一次在数学课上学习矢量时，老师告诉我，标量只有大小，而矢量既有大小又有方向。但我一直没有真正理解这一点，我更多关注的是方向部分，因为我被告知这是它与标量最大的区别。但在数学中，方向并不总是很明显。例如，在二维空间中，一个矢量可以表示为 (x, y)。那么这个矢量的方向是什么？是与 x 轴的夹角吗？还是与 y 轴的夹角？还是其他什么？当维度高于三维时，方向就更加令人困惑了。

此外，(x, y) 在二维空间中也是一个点。那么点和矢量有什么区别呢？老师说，点是空间中的一个位置，而矢量是方向和大小。但我还是不太明白。因为如果我们有两个点 (x1, y1) 和 (x2, y2)，我们可以通过相减得到一个矢量：(x2 - x1, y2 - y1)。所以在这种情况下，矢量也可以看作是空间中的一个位置。但两个点之间的运算是没有意义的，我们不能直接相加或相减两个点，只能对矢量进行加减运算。

几乎在同一时间，我在物理课上也学习了矢量。老师说速度是一个矢量，因为它既有大小又有方向。但在解题时，我们通常只关心大小。例如，如果一辆车以 60 公里每小时的速度行驶，我们通常不关心方向，只关心它有多快。所以在这种情况下，速度可以被当作标量。但如果我们想知道车往哪个方向开，就需要知道方向，这时速度就是矢量。（速度在英文的定义中更为精准，英文中存在speed和velocity两个单词来描述速度，speed代表标量velocity代表矢量，但在中文中通常只用一个词来表示。）

这两种经历让我当时更加困惑。一个是在数学上无法理解，另一个是在物理上用其他方式表示（物理中的方向通常用文字而不是数学表达）。这让我思考，为什么它们都叫矢量，但在不同的语境下却有不同的处理方式。

经过长时间的思考，我对矢量有了新的理解：

- 从定义上讲，标量是单一的数值，而矢量是一组数值。
- 在数学中，标量是单一数值，矢量是一组数值。方向存在，但意义不明显（缺乏语境）。
- 在应用科学中，矢量包含比标量更多的信息，但我们通常用其他方式来表示这些信息。例如，在物理中，速度是矢量，因为它有大小和方向。但在解题时，我们通常只计算大小，用文字描述方向（高中阶段）。

既然数学无处不在，我认为应用科学的老师应该更多地用数学的方法来解释矢量，并告诉学生为什么我们只计算大小，以及在本领域内矢量的其余维度是如何用其他方式表示的。这样可以统一数学和应用科学中对矢量的定义，帮助学生更好地理解矢量的概念。


Recently, when I use the gradient, I realize that I don't really understand vector. So I want to write down my thought of how to better understand the concept of vector.

When I first learn vector in math, the teacher told me that the difference between scalar and vector is that scalar has only magnitude, while vector has both magnitude and direction. But I never really understand that. I pay more attention on the direction part, because I was told that this is the biggest difference between it and scalar. But in math, the direction is not always obvious. For example, in 2D space, a vector can be represented as (x, y). But what is the direction of this vector? Is it the angle between the vector and the x-axis? Or is it the angle between the vector and the y-axis? Or is it something else? When the dimension is higher than 3, the direction is even more confusing.

Besides, (x,y) is also a point in 2D space. So what is the difference between a point and a vector? The teacher said that a point is a location in space, while a vector is a direction and magnitude. But I still don't understand. Because if we have two points (x1, y1) and (x2, y2), we can create a vector by subtracting the two points: (x2 - x1, y2 - y1). So in this case, the vector is also a location in space. But the computation between two points is meaningless. We cannot add or subtract two points. We can only add or subtract two vectors.

Nearly in the same time, I learned vector in physics class. The teacher said the velocity is a vector, because it has both magnitude and direction. But when we solve problems, we usually only care about the magnitude. For example, if a car is moving at 60 kph, we usually don't care about the direction. We just care about how fast it is moving. So in this case, the velocity can be treated as a scalar. But if we want to know where the car is going, then we need to know the direction. In this case, the velocity is a vector.

These two experiences made me more confused at that time. One is cannot understand(in math), the other is represented in other ways(direction in physics is always represented in words rather than in math). These made me think why they are all called vector, but got different treatment in different context.

Today, after long time thinking, I got some new understanding about vector.

- In definition, scalar is a single value, while vector is a collection of values. 

- In math, scalar is a single value, while vector is a collection of values. The direction exist but meaning is not obvious(lack of context).

- In applied science, vector has more information than scalar, but we always use other ways to represent the other information. For example, in physics, velocity is a vector because it has both magnitude and direction. But when we solve problems, we usually only compute the magnitude, and use words to describe the direction.(High school level)

As we need math every where, I think it is better for applied science teachers to explain the vector more in math way, and tell the student why we only compute the magnitude, and how the remaining dimensions of vectors in this domain are represented in other ways. This will align the definition of vector in both math and applied science, and help student to understand the concept of vector better.

