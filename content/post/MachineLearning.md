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

### Gradient
Assume a function \( f(x_1, x_2, \ldots, x_n) \) with multiple variables. The gradient of this function is a vector that contains all its partial derivatives:
$$ \nabla f(x) = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n} \right) $$
**Process:**
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

### Norm

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

### Probability

#### Independent events:
$$ P(A \cap B) = P(A)P(B) $$
$$ P(A \cup B) = P(A) + P(B) - P(A)P(B) $$

#### Conditional Probability:
$$ P(A \cap B) = P(A|B)P(B) = P(B|A)P(A) $$
$$ P(A \cup B) = P(A) + P(B) - P(A \cap B) $$

Check if two events are independent:
$$ P(A|B) = P(A) $$ or
$$ P(B|A) = P(B) $$

#### Bayes' Theorem:

- Prior probability vs Posterior probability:
Prior probability is the initial probability of an event before new evidence is considered. Posterior probability is the updated probability of an event after considering new evidence.

- Full probability formula:
$$ P(B) = P(A_1)P(B|A_1) + P(A_2)P(B|A_2) + \ldots = \sum_{i} P(B|A_i)P(A_i) $$

- Bayes' Theorem:
$$ P(A_i|B) = \frac{P(B|A_i)P(A_i)}{P(B)} = \frac{P(B|A_i)P(A_i)}{\sum_{j} P(B|A_j)P(A_j)} $$
The usage of Bayes' theorem is to update the probability of an event based on new evidence. We can use the posterior probability to predict the likelihood of an event occurring given the new evidence.
Given the machine learning context, we can use the dataset as "B", and the model parameters as "A". Then we can use Bayes' theorem to update the model parameters based on the dataset.

#### Likelihood function
The likelihood function is a fundamental concept in statistics and machine learning. It is used to estimate the parameters of a statistical model given observed data. The likelihood function measures how likely it is to observe the given data for different values of the model parameters. On the other hand, the probability function measures the likelihood of observing a specific outcome given a set of parameters.

In more common terms, the likelihood function is a function of the parameters of a statistical model, given the observed data. The input to the likelihood function is the model parameters, and the output is the likelihood of observing the data given those parameters.

For example, suppose we have a statistical model that has a possible output 5. We only use two parameters x and y in the model. The likelihood function describes how likely it is to observe the output 5 for different values of x and y.

Assume a statistical model with parameters \( \theta \) and observed data \( D \). The likelihood function \( L(\theta | D) \) is defined as the probability of observing the data given the parameters:
$$ L(\theta | D) = P(D | \theta) $$

In machine learning, the likelihood function is often used in maximum likelihood estimation (MLE) to find the parameter values that maximize the likelihood of the observed data. This is done by finding the parameter values that make the observed data most probable. 
The data fits independently and identically distributed (i.i.d.) assumption is often made, which means that the data points are assumed to be independent of each other and drawn from the same distribution. The distribution here can be considered as the machine learning model. We can use the likelihood function to find the best model parameters that fit the data.
Assume i.i.d. observations \( D = \{x_1, x_2, \ldots, x_n\} \). The likelihood function can be expressed as:
$$ L(\theta | D) = \prod_{i=1}^{n} P(x_i | \theta) $$
Since they are independent, the joint probability is the product of individual probabilities.
To simplify the computation, we often work with the log-likelihood function, which is the natural logarithm of the likelihood function:
$$ \ell(\theta | D) = \log L(\theta | D) = \sum_{i=1}^{n} \log P(x_i | \theta) $$
Maximizing the log-likelihood is equivalent to maximizing the likelihood due to the monotonic nature of the logarithm. It is often easier to work with the log-likelihood due to its additive properties.

#### Maximum Likelihood Estimation (MLE)
Maximum Likelihood Estimation (MLE) is a method used to estimate the parameters of a statistical model by maximizing the likelihood function. The goal of MLE is to find the parameter values that make the observed data most probable.
In machine learning, we only got the dataset, and we want to find the best model parameters that fit the data. We can use MLE to achieve this by finding the parameter values that maximize the likelihood of the observed data. On the other word, we want to find the model parameters that make the data most likely to be the data in the dataset.