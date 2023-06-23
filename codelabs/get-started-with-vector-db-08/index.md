summary: A deep dive into Approximate Nearest Neighbor Oh Yeah (Annoy)
id: vector-database-101-approximate-nearest-neighbor-oh-yeah
categories: Getting Started
tags: getting-started
status: Hidden
authors: Frank Liu
Feedback Link: https://github.com/milvus-io/milvus

---

# Vector Database 101 - Approximate Nearest Neighbor Oh Yeah

## Introduction
Duration: 1

Hey there - welcome back to [Milvus tutorials](https://codelabs.milvus.io/). In the previous tutorial, we did a deep dive into Hierarchical Navigable Small Worlds, or HNSW for short. HNSW is a graph-based indexing algorithm that's one of the most popular indexing strategies used in vector databases today.

In this tutorial, we'll switch gears and talk about _tree-based vector indexes_. Specifically, we'll talk about Approximate Nearest Neighbor Oh Yeah (Annoy) - an algorithm that uses a forest of trees to conduct nearest neighbor search. For those who are familiar with random forests or gradient-boosted decision trees, Annoy can seem like a very natural extension of these algorithms, only for nearest neighbor search rather than machine learning. As with our HNSW tutorial, we'll first walk through how Annoy works from a high level before developing our own simple Python implementation.

<div align="center">
  <img align="center" src="https://raw.github.com/spotify/annoy/master/ann.png">
</div>
<p style="text-align:center"><sub>Annoy, visualized (from https://github.com/spotify/annoy).</sub></p>

## Annoy basics
Duration: 3

Where HNSW is built upon the connected graph and skip list, Annoy uses binary search trees as the core data structure. The key idea behind Annoy (and other tree-based indexes) is to repeatedly partition our vector space and to search only a subset of the partitions for nearest neighbors. If this sounds a bit like IVF, you're absolutely right; the idea is the same, but the execution is a bit different.

The best way to understand Annoy is to visualize how a single tree is built. Keep in mind that high-dimensional hyperspaces are very different from 2D/3D Euclidean spaces from an intuitive perspective, so the images below should ideally only be used as a reference.

Let's start with indexing. For Annoy, this is a recursive process where the maximum size of the call stack is the depth of the tree. In the first iteration, two random dataset vectors __a__ and __b__ are selected, and the full hyperspace is split along a hyperplane equidistant from both __a__ and __b__. Vectors which lie in the "left" half of the hyperspace get assigned to left half of the tree, while vectors which lie in the "right" half of the subspace are assigned to the right half of the tree. Note that this can be done without actually computing the hyperplane itself - for every dataset vector, we simply need to determine whether __a__ (left) or __b__ (right) is closer.

<div align="center">
  <img align="center" src="https://i.imgur.com/4UUevet.png">
</div>
<p style="text-align:center"><sub>After the first, second, and Nth iteration, respectively. <a href="https://sds-aau.github.io/M3Port19/portfolio/ann/">Source</a>.</sub></p>

The second iteration repeats this process for both left and right subtrees output by the first iteration, resulting in a tree with a depth of two and four leaf nodes. This continues for the third iteration, fourth iteration, etc... all the way until a leaf node has fewer than some pre-defined number of elements `K`. In the [original Annoy implementation](https://github.com/spotify/annoy/blob/master/src/annoylib.h#L892), `K` is a variable value that can be set by the user.

With an index fully built, we can now move on to querying. Given some query vector __q__, we can perform a search simply by traversing the tree. Each intermediate node is split by a hyperplane, and we can figure out which side of the hyperplane the query vector falls on by computing the distance to the left and right vectors. We'll continue to do this until we hit a leaf node. The leaf node will contain an array of at most `K` vectors, which we can then rank and return to the user.

## Implementing Annoy

Now that we know how Annoy works, let's get started with an implementation. As usual, we'll first create a dataset of (128 dimensional) vectors:

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

Let's first define a `Node` class containing left and right subtrees:

```python
class Node(object):

    def __init__(vecs=[]):
        self._vecs = vecs
        self._left = None
        self._right = None

    @property
    def vecs(self):
        return self._vecs

    @property
    def left(self):
        return self._left

    @property
    def right(self):
        return self._right
```

The `vecs` variable contains a list of all vectors that are contained within the node. If the length of this list is less than some value `K`, then they will remain as-is; otherwise, these vectors will then get propogated to `left` and `right`, with `vecs[0]` and `vecs[1]` remaining as the two randomly selected vectors used to split the hyperplane.

Let's now move to indexing. Recall first that every node in the tree is split by a hyperplane orthogonal to the line which connects two randomly selected dataset vectors. Conveniently for us, we can figure out which side of the hyperplane a query vector lies on simply by computing distance. As usual, we'll use numpy's vectorized math for this:

```python
def _is_query_in_left_half(q, node):
    # returns `True` if query vector resides in left half
    dist_l = np.linalg.norm(q - node.vecs[0])
    dist_r = np.linalg.norm(q - node.vecs[1])
    return dist_l < dist_r
```

Now let's move to building the actual tree.

```python
import random


def _split_node(node, K=64, imb=0.95):

    # stopping condition: maximum # of vectors for a leaf node
    if len(node.vecs) <= K:
        return
    node.left = Node()
    node.right = Node()

    for n in range(5):

        # take two random indexes and swap to [0] and [1]
        idxs = random.sample(range(len(node.vecs)), 2)
        (node.vecs[0], node.vecs[idx[0]]) = (node.vecs[idx[0]], node.vecs[0])
        (node.vecs[1], node.vecs[idx[1]]) = (node.vecs[idx[1]], node.vecs[1])

        # split vectors into halves
        for vec in node.vecs:
            if _is_query_in_left_half(vec, node):
                node.left.vecs.append(vec)
            else:
                node.right.vecs.append(vec)

        # redo tree build process if imbalance is high
        rat = len(node.left.vecs) / len(node.vecs)
        if rat > imb or rat < (1 - imb):
            continue

    # we're done; remove vectors from input-level node
    # first two vectors correspond to `left` and `right`, respectively
    del node.vecs[2:]


def _build_tree(node, K, imb):

    _split_node(node, K=K, imb=imb)
    if node.left and node.right:
        _build_tree(node.left, K=K, imb=imb)
        _build_tree(node.right, K=K, imb=imb)


def build_tree(vecs, K=64, imb=0.95)

    root = Node()
    root.vecs = vecs
    _build_tree(root, K=K, imb=imb)

```

This is a denser block of code, so let's walk through it step-by-step. Given an already-initialized `Node`, we first randomly select two vectors and split the dataset into left and right halves. We then use the function we defined earlier to determine which of the two halves the subvectors belong to. Note that we've added in an `imb` parameter to maintain tree balance - if one side of the tree contains more than 95% of the all subvectors, we redo the split process.

With node splitting in place, the `build_tree` function will simply recursively call itself on all nodes. Leaf nodes are defined as those which contain fewer than `K` subvectors.

Great, so we've built a binary tree that lets us significantly reduce the scope of our search. Now let's implement querying as well. Querying is fairly straightforward; we simply traverse the tree, continuously moving along the left or right branches until we've arrived at the one we're interested in:

```python
def query_tree(q, root):

    node = root

    while not node.vecs:
        # iteratively determine whether right or left node is closer
        if _is_query_in_left_half(q, node):
            node = node.left
        else:
            node = node.right

    # find nearest neighbor in leaf node
    (nn, m_dist) = (None, float("inf"))
    for v in node.vecs:
        dist = np.linalg.norm(v - q)
        if dist < m_dist:
            (nn, m_dist) = (v, dist)

    return nn
```

This chunk of code will greedily traverse the tree, returning a single nearest neighbor (`nq = 1`). Recall, however, that we're often times interested in finding multiple nearest neighbors. Additionally, it's entirely possible for multiple nearest neighbors to live in other leaf nodes as well. How can we solve these issues?

## Run, forest, run
Duration: 1

(Yes, I do realize that the main character's name is spelled "Forrest" in the [American classic](https://en.wikipedia.org/wiki/Forrest_Gump).)

In a previous tutorial on IVF, recall that we often expanded our search beyond the Voronoi cell closest to the query vector. The reason is due to _cell edges_ - if a query vector is close to a cell edge, it's very likely that some of its nearest neighbors may be in a neighboring cell. In high-dimensional spaces, these "edges" are much more common, so a large-ish value of `nprobe` is often used when high recall is needed.

For tree-based indexes, we face the same problem - some of our nearest neighbors may be outside of the nearest leaf node/polygon. Annoy solves this by 1) allowing for searches on both sides of a split, and 2) creating a _forest_ of trees.

Let's first expand on our implementation in the previous section to search both sides of a split:

```python

    std::vector<S> nns;
    while (nns.size() < (size_t)search_k && !q.empty()) {
      const pair<T, S>& top = q.top();
      T d = top.first;
      S i = top.second;
      Node* nd = _get(i);
      q.pop();
      if (nd->n_descendants == 1 && i < _n_items) {
        nns.push_back(i);
      } else if (nd->n_descendants <= _K) {
        const S* dst = nd->children;
        nns.insert(nns.end(), dst, &dst[nd->n_descendants]);
      } else {
        T margin = D::margin(nd, v, _f);
        q.push(make_pair(D::pq_distance(d, margin, 1), static_cast<S>(nd->children[1])));
        q.push(make_pair(D::pq_distance(d, margin, 0), static_cast<S>(nd->children[0])));
      }
    } 

    // Get distances for all items
    // To avoid calculating distance multiple times for any items, sort by id
    std::sort(nns.begin(), nns.end());
    vector<pair<T, S> > nns_dist;
    S last = -1;
    for (size_t i = 0; i < nns.size(); i++) {
      S j = nns[i]; 
      if (j == last)
        continue;
      last = j;
      if (_get(j)->n_descendants == 1)  // This is only to guard a really obscure case, #284
        nns_dist.push_back(make_pair(D::distance(v_node, _get(j), _f), j));
    }

    size_t m = nns_dist.size();
    size_t p = n < m ? n : m; // Return this many items
    std::partial_sort(nns_dist.begin(), nns_dist.begin() + p, nns_dist.end());
    for (size_t i = 0; i < p; i++) {
      if (distances)
        distances->push_back(D::normalized_distance(nns_dist[i].first));
      result->push_back(nns_dist[i].second);
    }

def _select_nearby(q, node, thresh=0)
    # functions identically to _is_query_in_left_half, but can return both
    dist_l = np.linalg.norm(q - node.vecs[0])
    dist_r = np.linalg.norm(q - node.vecs[1])
    diff = math.abs(dist_l - dist_r)
    if diff < thresh:
        return (node.left, node.right)
    if dist_l < dist_r:
        return (node.left,)
    return (node.right,)


def query_tree(q, root, thresh=0.5):

    nodes = [root]
    nns = []

    while True:
        # iteratively determine whether right or left node is closer

        if _select_nearby(q, node):
            node = node.left
        else:
            node = node.right

    # find nearest neighbor in leaf node
    (nn, m_dist) = (None, float("inf"))
    for v in node.vecs:
        dist = np.linalg.norm(v - q)
        if dist < m_dist:
            (nn, m_dist) = (v, dist)

    return nn
```

Next, we'll add a function to allow us to build the full index as a forest of trees:

```python
def build_index(vecs, nt=8, K=64, imb=0.95):
    return [build_tree(vecs, K=K, imb=imb) for _ in range(nt)]
```

With everything implemented, let's now put it all together, as we've done for IVF, SQ, PQ, and HNSW:

```python

```

And that's it for Annoy!

## Wrapping up
Duration: 1

In this tutorial, we did a deep dive into Annoy, a tree-based indexing strategy with a playful name. As mentioned in our previous tutorial, Python is not the most ideal language for implementing vector search data structures due to interpreter overhead, but we nonetheless try to make use of as much numpy-based array math as possible. There are also many optimizations that we can do to prevent copying memory back and forth, but I'll leave those (once again) as an exercise for the reader :sunny:.

In the next tutorial, we'll continue our deep dive into indexing strategies with a rundown of the Vamana algorithm - also known more commonly as _DiskANN_ - a unique graph-based indexing algorithm that is tailored specifically towards querying directly from solid state hard drives.

All code for this tutorial is freely available on Github: https://github.com/fzliu/vector-search.
