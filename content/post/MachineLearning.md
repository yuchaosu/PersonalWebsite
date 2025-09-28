---
title: 机器学习数学基础（The Mathematical Foundations of Machine Learning）
summary: 机器学习是人工智能的一个分支，它使计算机能够从数据中学习和做出决策。 Machine learning is a branch of artificial intelligence that enables computers to learn from data and make decisions.
date: 2025-09-24
math: true
authors:
  - admin
tags:
  - Machine Learning
  - Artificial Intelligence
  - Learning
# image:
#   caption: 'Tech Equity'
---

## Mathmatical Foundations

**Gradient**
Assume a function \( f(x_1, x_2, \ldots, x_n) \) with multiple variables. The gradient of this function is a vector that contains all its partial derivatives:
$$ \nabla f(x) = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n} \right) $$
Process:
1. Compute the exact differential of the function \( f \):
$$ df = \frac{\partial f}{\partial x_1} dx_1 + \frac{\partial f}{\partial x_2} dx_2 + \ldots + \frac{\partial f}{\partial x_n} dx_n $$
2. Create two vectors:
   - The vector of partial derivatives:
   $$\boldsymbol{\alpha} = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n} \right) $$
   - The vector of differentials:
   $$ \mathbf{dx} = (dx_1, dx_2, \ldots, dx_n) $$
3. The exact differential can be expressed as the dot product of these two vectors:
$$ df = \boldsymbol{\alpha} \cdot \mathbf{dx} $$
4. When we compute the vector dot product, we get:
$$ \boldsymbol{\alpha} \cdot \mathbf{dx} = |\boldsymbol{\alpha}| |\mathbf{dx}| \cos(\theta) $$
where \( \theta \) is the angle between the two vectors.
5. The value of $|\mathbf{dx}|$ is fixed, representing a small change in the input variables. The value of \( \cos(\theta) \) varies between -1 and 1, depending on the angle between the two vectors. The maximum value of \( df \) occurs when \( \theta = 0 \), meaning the two vectors are aligned. In this case:
$$ df_{max} = |\boldsymbol{\alpha}| |\mathbf{dx}| $$
On the other word, the maximum rate of change of the function \( f \) occurs in the direction of the gradient vector \( \boldsymbol{\alpha} \).
This matches the original expression
The gradient is the combination of all partial derivatives. It points in the direction of the steepest ascent of the function. (Changes fastest in this direction)
Follow the **reversed** gradient direction a little bit, then recompute the **reversed** gradient, follow the new direction, and repeat. Then we can reach the **local minimum** of the function. (Loss Function)

**Norm**
The norm of a vector is a measure of its length or magnitude. 

- L0 norm: The L0 norm of a vector counts the number of non-zero elements in the vector. It is defined as:
$$ ||\mathbf{x}||_0 = \text{number of non-zero elements in } \mathbf{x} $$
- L1 norm: The L1 norm of a vector is the sum of the absolute values of its elements. Also known as Manhattan distance, it is defined as:
$$ ||\mathbf{x}||_1 = \sum_{i=1}^{n} |x_i| $$
- L2 norm: The L2 norm of a vector is the square root of the sum of the squares of its elements. Also known as the Euclidean norm, it is defined as:
$$ ||\mathbf{x}||_2 = \sqrt{\sum_{i=1}^{n} x_i^2} $$
- L-p norm: The L-p norm of a vector is a generalization of the L1 and L2 norms. It is defined as:
$$ ||\mathbf{x}||_p = \left( \sum_{i=1}^{n} |x_i|^p \right)^{1/p} $$
for any real number \( p \geq 1 \).
- L-infinity norm: The L-infinity norm of a vector is the maximum absolute value among its elements. It is defined as:
$$ ||\mathbf{x}||_\infty = \max_{1 \leq i \leq n} |x_i| $$

**Tensor**
