summary: An introduction to the vector database.
id: vector-database-101-introduction-to-faiss
categories: Getting Started
tags: getting-started
status: Hidden
authors: Frank Liu
Feedback Link: https://github.com/milvus-io/milvus

---

# Vector Database 101 - Scalar Quantization and Product Quantization

## Introduction

Hey there - welcome back to [Milvus tutorials](https://codelabs.milvus.io/). In the previous tutorial, went over a quick word embedding example to better understand the power of embeddings along with how they are stored and indexed in a vector database. This led to a brief overview of nearest neighbor search algorithms, a computing problem that involves finding the closest vector(s) to a query vector based on a selected distance metric.

In this tutorial, we'll build on top of that knowledge but diving deeper into quantization techniques - specifically scalar quantization (also called integer quantization) and product quantization. We'll implement our own scalar and product quantization algorithms in Python, but we'll also see how we can use _Facebook AI Similarity Search_ (Faiss, pronounced like "face") to implement these indexing strategies more efficiently and with less effort. Towards the end, we'll also briefly discuss how Faiss is used as a subcomponent within the Milvus compute engine to power ANN search, keeping in mind the multitude of different layers atop the core indexing strategy that comprise a scalable vector database.

Let's dive in.

## Scalar quantization

As mentioned in the previous tutorial, quantization is a technique for reducing the total size of the database by reducing the overall _precision_ of the vectors. Note that this is very different from dimensionality reduction (PCA, LDA, etc), which attempts to reduce the _length_ of the vectors:

```python
>>> vector.size  # length of our original vector
128
>>> quantized_vector.size  # length of our quantized vector
128
>>> reduced_vector.size  # length of our dimensionality reduced vector
16
```

Dimensionality reduction methods such as PCA use linear algebra to project the input data into a lower dimensional space. Without getting too deep into the math here, just know that these methods generally aren't used as the primary indexing strategy because they tend to have limitations on the distribution of the data. PCA, for example, works best on data that can be separated into independent, Gaussian distributed components.

Quantization, on the other hand, makes no assumption about the distribution of the data - rather, it looks at each dimension (or group of dimensions) separately and attempts to "bin" each value into one of many discrete buckets. In particular, scalar quantization turns floating point values into low-dimensional integers:

```python
>>> vector.dtype  # data type of our original vector
dtype('float64')
>>> quantized_vector.dtype
dtype('int8')
>>> reduced_vector.size
dtype('float64')
```

From the above example, we can see that scalar quantization has reduced the total size of our vector (and vector database) by a whopping 8x. Nice.

So how does scalar quantization work? Let's first take a look at the forward-conversion process, i.e. turning floating point vectors into integer vectors. For each vector dimension, scalar quantization takes the maximum and minimum value of that particular dimension as seen across the entire database, and uniformly splits that dimension into bins across its entire range:

<div align="center">
  <img align="center" src="">
</div>
<p style="text-align:center"><sub>Scalar quantization for a single dimension.</sub></p>

Let's try writing that in code. We'll first generate 1000 128D floating point vectors sampled from a multivariate distribution:

```python
>>> import numpy as np
>>> vectors = np.random.normal(size=(1000, 128))
```

Now, let's determine the maximum and minimum values of each dimension of the vector and store it in a matrix called `ranges`:

```python
>>> ranges = np.vstack((np.min(vectors, axis=1), np.max(vectors, axis=1)))
```

The goal here is to quantize 

```python
>>>
```

## Product quantization

Product quantization is a much more powerful way to quantize vectors 

## Vector quantization techniques in Faiss

Faiss is a library for highly efficient vector search. Specifically, Faiss allows us to rapidly search across a variety of 

It assumes that the instances are represented as vectors and are identified by an integer, and that the vectors can be compared with L2 (Euclidean) distances or dot products. Vectors that are similar to a query vector are those that have the lowest L2 distance or the highest dot product with the query vector. It also supports cosine similarity, since this is a dot product on normalized vectors.

So, given a set of vectors, we can index them using Faiss — then using another vector (the query vector), we search for the most similar vectors within the index.

Now, Faiss not only allows us to build an index and search — but it also speeds up search times to ludicrous performance levels — something we will explore throughout this article.

## Approximate nearest neighbor search


## Milvus and FAISS

FAISS is one of the many components within Milvus used to 


## Wrapping up

In this tutorial, we took a look at FAISS, along with how it fits into the Milvus compute engine to implement low-level ANN search. Specifically, we discussed:

- A
- B
- C

Thanks for joining us for this tutorial! In future tutorials, we'll continue to dive deeper into different ANN search algorithms.
