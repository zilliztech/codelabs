summary: A deep dive into DiskANN and the Vamana algorithm
id: vector-database-101-diskann-and-the-vamana-algorithm
categories: Getting Started
tags: getting-started
status: Hidden
authors: Frank Liu
Feedback Link: https://github.com/milvus-io/milvus

---

# Vector Database 101 - DiskANN and the Vamana Algorithm

## Introduction
Duration: 1

Hey there - welcome back to [Milvus tutorials](https://codelabs.milvus.io/). In the previous tutorial, we did a deep dive into Approximate Nearest Neighbors Oh Yeah, or Annoy for short. HNSW is a tree-based indexing algorithm that uses random projections to iteratively divide the subspace of . Although Annoy isn't commonly used as an indexing algorithm today, 

In this tutorial, we'll talk about _DiskANN_ - a disk-based index that is mean to enable large-scale storage . Unlike previous tutorials, there won't be a Python implementation, but we'll still discuss the algorithm along with how it works 

<div align="center">
  <img align="center" src="https://raw.github.com/spotify/annoy/master/ann.png">
</div>
<p style="text-align:center"><sub>Annoy, visualized (from https://github.com/spotify/annoy).</sub></p>

## DiskANN overview
Duration: 3

<div align="center">
  <img align="center" src="">
</div>
<p style="text-align:center"><sub>Description</sub></p>

## The Vamana algorithm
Duration: 2

## Running on-disk
Duration: 2


## Wrapping up
Duration: 1

In this tutorial, we did a deep dive into DiskANN, a tree-based indexing strategy with a playful name. As mentioned in our previous tutorial, Python is not the most ideal language for implementing vector search data structures due to interpreter overhead, but we nonetheless try to make use of as much numpy-based array math as possible. There are also many optimizations that we can do to prevent copying memory back and forth, but I'll leave those (once again) as an exercise for the reader :sunny:.

This concludes our 
