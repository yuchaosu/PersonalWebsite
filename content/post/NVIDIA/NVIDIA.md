---
title: CUDA快速上手指南（The Quick Start Guide to CUDA）
summary: 简单高效的CUDA上手指南，让你快速理解CUDA。 A simple and efficient quick start guide to CUDA, helping you quickly understand CUDA.
date: 2025-09-30
math: true
authors:
  - admin
tags:
  - High Performance Computing
  - GPU
  - CUDA
  - Parallel Computing
  - Learning
image:
  caption: 'CUDA'
---

## The architecture of NVIDIA GPU

{{< figure src="NVIDIA/overview.jpg" title="NVIDIA GPU Architecture" alt="GPU Architecture" >}}


GPU is originally designed for graphics rendering. It has a large number of cores that can handle multiple tasks simultaneously, making it ideal for parallel computing. The architecture of NVIDIA GPU consists of several key components:

{{< figure src="NVIDIA/sm.jpeg" title="NVIDIA GPU Architecture" alt="GPU Architecture" >}}

- **Streaming Multiprocessors (SMs)**: The SM is the core of the GPU. Each SM contains multiple CUDA cores, which are responsible for executing instructions. Each SM has multiple blocks, and each block contains multiple threads. The SM manages the execution of threads and blocks, and it also handles memory access and scheduling. The shared memory and registers are also part of the SM, which are used for fast data access and storage. **Each SM shares one <span style="color:red">shared memory</span> space among its threads. Each block in the SM shares one <span style="color:red">register file</span>.** Proper utilization of these resources is crucial for achieving high performance. The number of SMs in a GPU varies depending on the model. For example, the NVIDIA A100 GPU has 108 SMs, while the NVIDIA RTX 3090 has 82 SMs.

{{< figure src="NVIDIA/cudacore.jpg" title="NVIDIA CUDA Cores" alt="CUDA Cores" >}}

- **CUDA Cores**: CUDA cores are the basic processing units of the GPU. They are similar to CPU cores but are optimized for parallel processing. Each SM contains multiple CUDA cores, allowing it to execute many threads simultaneously. The CUDA cores are used to be called "stream processors", and the name "CUDA core" was firstly introduced with the Fermi architecture.

{{< figure src="NVIDIA/tensorcore.jpg" title="NVIDIA Tensor Cores" alt="Tensor Cores" >}}

- **Tensor Cores**: Tensor Cores are specialized processing units within NVIDIA GPUs designed to accelerate deep learning and matrix operations. They are optimized for performing mixed-precision matrix multiplications and accumulations, which are common in neural network training and inference. Tensor Cores can significantly speed up computations by handling multiple operations in parallel, making them ideal for AI workloads. (Pending Construction)

{{< figure src="NVIDIA/memhier.jpg" title="NVIDIA GPU Memory Hierarchy" alt="Memory Hierarchy" >}}

- **Memory Hierarchy**: The memory hierarchy of NVIDIA GPU includes several types of memory, each with different access speeds and sizes:
  - **Global Memory**: The largest and slowest memory, accessible by all threads. It is used to store data that needs to be shared among threads.
  - **Shared Memory**: A smaller and faster memory, shared among threads within the same block. It is used for data that needs to be accessed frequently by threads in the same block.
  - **Registers**: The fastest memory, used to store temporary variables for each thread. Each thread has its own set of registers.

Besides these components, NVIDIA GPUs also include other features such as L1 and L2 caches, texture units, and memory controllers to optimize performance and efficiency. 

## CUDA Programming Model
CUDA is a parallel computing platform and programming model developed by NVIDIA. It allows developers to use NVIDIA GPUs for general-purpose computing. The CUDA programming model consists of several key concepts:

{{< figure src="NVIDIA/programmodel.png" title="CUDA Program Model" alt="CUDA Program Model" >}}

- **Kernels**: A kernel is a function that is executed on the GPU. It is defined using the `__global__` keyword in CUDA C/C++. When a kernel is launched, it is executed by multiple threads in parallel.
- **Threads**: A thread is the basic unit of execution in CUDA. Each thread executes a single instance of a kernel. Threads are organized into blocks and grids.
- **Warps**: A warp is a group of **32 threads** that are executed simultaneously on a single SM. All threads in a warp execute the same instruction at the same time, which allows for efficient execution of parallel code. The warp is created and managed by blocks.
- **Blocks**: A block is a group of threads that can cooperate with each other by sharing data through **shared memory**. Blocks are executed on a single SM. Each block can contain up to 1024 threads (depending on the GPU architecture). *Notably, SM is not dedicated to a single block; it can handle multiple blocks concurrently, and it is not involved in the index calculation of threads.*
- **Grids**: A grid is a collection of blocks. When a kernel is launched, it is executed by a grid of blocks. The grid can be one-dimensional, two-dimensional, or three-dimensional, allowing for flexible organization of threads.    

From top to bottom, the hierarchy is: Grid -> Blocks -> Warps -> Threads -> Kernels. (Warp is an execution grouping of threads, not a container above threads)

*The Ampere SM Architecture*
{{< figure src="NVIDIA/amperesm.png" title="Ampere SM Architecture" alt="Ampere SM Architecture" >}}

Basically, we can consider each CUDA core as a small CPU core, each block contains multiple CUDA cores, and each grid contains multiple blocks. The kernel is the function that runs on each CUDA core (thread).

### CUDA Memory Management
CUDA provides several APIs for managing memory on the GPU. Developers can allocate and free memory on the GPU using functions like `cudaMalloc()` and `cudaFree()`. Data can be transferred between the host (CPU) and device (GPU) using functions like `cudaMemcpy()`. CUDA also supports unified memory, which allows the CPU and GPU to share a single memory space.

The memory on the GPU is organized into row vectors. Each row vector contains multiple elements, and each element can be accessed using its index. 


### CUDA Execution Configuration

When launching a kernel, developers need to specify the execution configuration, which includes the number of blocks and threads per block. This configuration determines how many threads will be executed in parallel on the GPU. The execution configuration is specified using the `<<<...>>>` syntax when calling a kernel.

The execution on CUDA is unsynchronized by default. This means that when a kernel is launched, the CPU continues executing the next instructions without waiting for the kernel to finish. To synchronize the CPU and GPU, developers can use functions like `cudaDeviceSynchronize()`.

The thread indexing in CUDA is done using built-in variables like `threadIdx`, `blockIdx`, and `blockDim`. These variables allow developers to determine the unique index of each thread within a block and grid, enabling them to access specific data elements in memory. Each thread has its own unique index, which can be calculated using these built-in variables. 

{{< figure src="NVIDIA/threadidx.png" title="CUDA Thread Indexing" alt="Thread Indexing" >}}

`threadIdx`, `blockIdx`, and `blockDim` are Dim3 variables, which means they can be used in 1D, 2D, or 3D configurations. This allows for flexible organization of threads and blocks. Notably, the high dimension indexing is only for logical organization; the actual physical layout is still linear.

To calculate the global index of a thread in a 2D grid, you can use the following formula:
$$
\text{global}_x = \text{blockIdx}.x \times \text{blockDim}.x + \text{threadIdx}.x \\
\text{global}_y = \text{blockIdx}.y \times \text{blockDim}.y + \text{threadIdx}.y \\
\text{idx} = \text{global}_y \times \text{width} + \text{global}_x \\
\text{idx} = (\text{blockIdx}.y \times \text{blockDim}.y + \text{threadIdx}.y) \times (\text{blockDim}.x * \text{gridDim}.x) \\ + (\text{blockIdx}.x \times \text{blockDim}.x + \text{threadIdx}.x)
$$

Where `width` is the total width of the data being processed, the number of CUDA cores in a block. This formula calculates the global x and y coordinates of the thread based on its block and thread indices, and then computes a linear index `idx` that can be used to access elements in a 1D array representation of the 2D data.

For example, as shown in the figure, if you want to calculate the index of a thread 12 in block 12 in a 2D grid with 5 blocks in the x direction and 4 blocks in the y direction, and each block has 5 threads in the x direction and 5 threads in the y direction, you can use the formula above to calculate the index as follows:
$$
\text{global}_x = 2 \times 5 + 2 = 12 \\
\text{global}_y = 2 \times 5 + 2 = 12 \\
\text{idx} = 12 \times 20 + 12 = 252 \\
$$

When the kernel is launched, the GPU will execute the kernel on multiple threads in parallel. Each thread will have its own unique index, which can be used to access specific data elements in memory. 

Besides, **the warp size is 32**, which means that 32 threads are executed simultaneously on a single SM. Therefore, it is recommended to use a multiple of 32 for the number of threads per block to ensure optimal performance. 
- If the number of threads per block is not a multiple of 32, some threads in the last warp may be **idle**, leading to suboptimal performance.
- If the number of threads is larger than 32, multiple warps will be created, and the GPU will **schedule the warps for execution.**
- The maximum number of threads per block is 1024 for most NVIDIA GPUs. However, the optimal number of threads per block may vary depending on the **specific GPU architecture** and the nature of the **kernel** being executed. It is recommended to experiment with different configurations to find the optimal settings for a specific application. When considering the number of threads per block, it is **also** **important** to take into account the amount of shared memory and registers used by each thread, as these resources are limited on the GPU.

## CUDA Divergence
Divergence occurs when threads within a warp take different execution paths due to conditional statements (e.g., if-else statements). Since all threads in a warp execute the same instruction at the same time, divergence can lead to performance degradation. When threads diverge, the warp must execute each path sequentially, which can result in some threads being idle while others are executing.