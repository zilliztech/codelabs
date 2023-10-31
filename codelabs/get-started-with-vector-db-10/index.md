summary: A high-level guide on how to choose the right vector index for your application.
id: vector-database-101-choosing-the-right-vector-index
categories: Getting Started
tags: getting-started
status: Hidden
authors: Frank Liu
Feedback Link: https://github.com/milvus-io/milvus

---

# Vector Database 101 - Choosing the Right Vector Index

## A quick recap
Duration: 3

In our Vector Database 101 series, we've learned that vector databases are purpose-built pieces of infrastructure meant to conduct _approximate nearest neighbor search_ across large datasets of high-dimensional vectors (typically over 96 dimensions and sometimes over 10k). These vectors are meant to represent the semantics of _unstructured data_, i.e. data that cannot be fit into traditional databases such as relational databases, wide-column stores, or document databases.

Conducting efficient approximate nearest neighbor search requires a data structure known as a _vector index_. These indexes enable efficient traversal of the entire database; rather than have to perform brute-force search with each vector, we can 

n the past several posts, we went over a variety of in-memory vector search algorithms and indexing strategies available to you as on your vector search journey. For those who missed out, here's a list and quick summary of each:

- Brute-force search (`FLAT`)

  Brute-force search, also known as "flat" indexing, is an approach that compares the query vector with every other vector in the database. While it may seem naive and inefficient, flat indexing can yield surprisingly good results for small datasets, especially when parallelized with accelerators like GPUs or FPGAs. 

- Inverted file index (`IVF`)

  IVF is a partition-based indexing strategy that assigns all database vectors to the partition with the closest centroid. Cluster centroids are determined using unsupervised clustering (typically k-means). With the centroids and assignments in place, an inverted index is created, correlating each centroid with a list of vectors in its cluster. IVF is generally a solid choice for small- to medium-size datasets.

- Scalar quantization (`SQ`)

  Scalar quantization converts floating point vectors (typically `float32` or `float64`) into integer vectors by dividing each dimension into bins. The process involves determining maximum and minimum values of each dimension, calculating start values and step sizes, and performing quantization by subtracting start values and dividing by step sizes. The quantized dataset typically uses 8-bit unsigned integers, but lower values (5-bit, 4-bit, and even 2-bit) are common as well.

- Product quantization (`PQ`)

  Scalar quantization disregards distribution along each vector dimension, which can potentially lead to underutilized bins. Product quantization (PQ) is a more powerful alternative which performs both compression and reduction: high-dimensional vectors are mapped to low-dimensional quantized vectors assigning fixed-length chunks of the original vector to a single quantized value. `PQ` typically involves splitting vectors, applying k-means clustering across all splits, and converting centroid indices.

- Hierarchical Navigable Small Worlds (`HNSW`)

  HNSW is perhaps the most commonly used vectoring indexing strategy today. It combines two concepts: skip lists and Navigable Small Worlds (NSWs). Skip lists are effectively layered linked lists for faster random access (`O(log n)` for skip lists vs `O(n)` for linked lists). In HNSW, we create a hierarchical graph of NSWs. Searching in HNSW involves starting at the top layer and moving towards the nearest neighbor in each layer until we find the closest match. Inserts work by finding the nearest neighbor and adding connections.

- Approximate Nearest Neighbors Oh Yeah (`Annoy`)

  `Annoy` is a tree-based index that uses binary search trees as its core data structure. It partitions the vector space recursively to create a binary tree, where each node is split by a hyperplane equidistant from two randomly selected child vectors. The splitting process continues until leaf nodes have fewer than a predefined number of elements. Querying simply involves iteratively the tree to determine which side of the hyperplane the query vector falls on.

Don't worry if some of these summaries feel a bit obtuse. Vector search algorithms can be fairly complex but are often easier to explain with visualizations and a bit of code. If you're interested in any of these, feel free to click on the link - it will take you to the original article explaining each algorithm/index in detail.

## Picking a vector index
Duration: 2

So how exactly do we choose the right vector index? This is a fairly open-ended question, but one of the key principles to keep in mind is that the right index will depend on your application requirements. For example: are you primarily interested in query speed (with a static database), or will your application require a lot of inserts and deletes? Do you have any constraints on the machine type you're using, such as limited memory or limited CPU? Or perhaps the domain of data that you'll be inserting will change over time? All of these factors contribute to the most optimal index type to use.

Let's first go over a simple index selection flowchart first.

PLEASE INSERT A DIAGRAM HERE

__100% recall__: This one is fairly simple - use `FLAT` search if you need 100% accuracy. All efficient data structures for vector search perform _approximate_ nearest neighbor search, meaning that there's going to be a loss of recall once the index size hits a certain threshold.

__`index_size` < 10MB__: If your total index size is tiny (fewer than 5k 512-dimensional `float32` vectors), just use `FLAT` search. The overhead associated with index building, maintainence, and querying is simply not worth it for a tiny dataset.

__10MB < `index_size` < 2GB__: If your total index size is small (fewer than 100k 512-dimensional `float32` vectors), my personal recommendation is to go with a standard inverted-file index (e.g. `IVF`). An inverted-file index can reduce the search scope by around an order of magnitude without while still maintaining fairly high recall.

__2GB < `index_size` < 20GB__: Once your reach a mid-size index (fewer than 10M 512-dimensional `float32` vectors), you'll want to start considering other `PQ` and `HNSW` index types. Both will give you reasonable query speed and throughput, but `PQ` allows you to use significantly less memory at the expense of low recall, while `HNSW` often gives you 95%+ recall at the expensive of high memory usage - around 1.5x the total size of your index. For dataset sizes in this range, composite `IVF` indexes (`IVF_SQ`, `IVF_PQ`) can also work well, but I would use them only if you have limited compute resources.

__20GB < `index_size` < 200GB__: For large datasets (fewer than 100M 512-dimensional `float32` vectors), I recommend the use of _composite indexes_: `IVF_PQ` for memory-constrained applications and `HNSW_SQ` for applications that require high recall. We mentioned this very briefly in a prior post, but as a quick recap, a composite index refers to an indexing technique that combines multiple vector search strategies into a single index. This effectively combines the best of both indexes; `HNSW_SQ`, for example, retains most of `HNSW`'s base query speed and throughput but with a significantly reduced index size. We won't dive too deep into composite indexes here, but for those interested, [FAISS's documentation](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes-(composite)) provides a great overview.

One last note on Annoy - we don't recommend using it simply because it fits into a similar category as HNSW but is, generally speaking, not as performant. Annoy is certainly the most uniquely named index though, so it gets bonus points there.

## A word on disk indexes
Duration: 1

Another option we haven't dove into explicitly in this blog post is disk-based indexes. In a nutshell, disk-based indexes leverage the architecture of NVMe disks by colocating individual search subspaces into their own NVMe page. In conjunction with zero seek latency, this enables efficient storage of both graph- and tree-based vector indexes.

These index types are becoming increasingly popular since they enable the storage and search of billions of vectors on a single machine while still maintaining a reasonable level of performance. The downside to disk-based indexes should be obvious as well: because disk reads are significantly slower than RAM reads, disk-based indexes often experience increased query latencies, sometime by over 10x! If you are willing to sacrifice a latency and throughput for the ability to store billions of vectors at minimal cost, disk-based indexes are the way to go. Conversely, if your application requires high performance (often at the expense of increase compute costs), you'll want to stick with `IVF_PQ` or `HNSW_SQ`.

## Wrapping up
Duration: 1

In this tutorial, did a quick recap of some of the vector indexing strategies available to you, in addition to providing a simple flowchart to help determine the optimal strategy given your data size and compute limitations. Please note that this flowchart is a very general guideline and not a hard-and-fast rule. Ultimately, you'll need to understand the strengths and weaknesses of each indexing option, as well as whether a composite index can help you squeeze out the last bit of performance your application needs. All of these index types are freely available to you in Milvus, so you'll be able to experiment as you see fit. Go out there and experiment!

Although this concludes our mini-series on vector indexes, our Vector Database 101 series will continue. In the next couple of articles, we'll go over some common applications and usage patterns. 



