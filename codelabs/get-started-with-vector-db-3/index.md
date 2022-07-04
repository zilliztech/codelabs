summary: Getting started with Milvus - the world's most popular open-source vector database.
id: getting-started-with-vector-databases-milvus-quickstart
categories: Getting Started
tags: getting-started
status: Published
authors: Frank Liu
Feedback Link: https://github.com/milvus-io/milvus

---

# Getting Started with Vector Database - Milvus Quickstart

Hey there - welcome back to Milvus codelabs. In the previous tutorial, we provided a brief introduction to Milvus, Milvus' history, as well as the primary differences between Milvus 1.x and Milvus 2.x. We also took a quick tour of the architecture of Milvus 2.x and helped shine some light on how Milvus' architecture allows it to implement all of the required features of vector databases.

## Let's get started

If you haven't read the previous tutorials ([unstructured data](https://codelabs.milvus.io/getting-started-with-vector-databases-introduction-to-unstructured-data/index), [vector databases](https://codelabs.milvus.io/getting-started-with-vector-databases-what-is-a-vector-database/index), [Milvus introduction](https://codelabs.milvus.io/getting-started-with-vector-databases-introduction-to-milvus/index)), I recommend you go ahead and read them. If you have, great. Let's get started with Milvus!

We offer two different modes of deployment: standalone and cluster. In Milvus standalone, all nodes - coordinators, worker nodes, and forward-facing proxies - are deployed as a single instance. For persistent data and metadata, Milvus standalone relies on `MinIO` and `etcd`, respectively. In future releases, we hope to eliminate these two third-party dependencies, allowing everything to run in a single process and removing the need to install third-party dependencies.

Milvus cluster is our full-fledged version of Milvus, complete with separate instances/pods for all eight microservice components along with three third-party dependencies: `MinIO`, `etcd`, and `Pulsar` (Pulsar serves as the log broker and provides log pub/sub services). If you haven't gotten the chance to take a look at the Milvus overview from the previous slide, please do so! It'll help clarify what each of these third party dependencies is used for and why we've included them in Milvus cluster.

## Milvus standalone (`docker-compose`)

Milvus standalone is meant to be super easy to install. In this section, we'll go over how `docker-compose` can be used to install Milvus. You can view the recommended prerequisites [here](https://github.com/milvus-io/milvus-docs/blob/v2.0.x/site/en/getstarted/prerequisite-docker.md).

Let's first download the [`docker-compose.yml`](https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml) configuration file needed for the standalone installation. If you're on any Debian-based Linux (including Ubuntu), you can use the following command:

```shell
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -O docker-compose.yml
```

```shell
    Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.108.133, 185.199.111.133, 185.199.109.133, ...
    Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.108.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 1303 (1.3K) [application/octet-stream]
    Saving to: ‘docker-compose.yml’

    docker-compose.yml  100%[===================>]   1.27K  --.-KB/s    in 0s

    2022-06-29 13:58:49 (113 MB/s) - ‘docker-compose.yml’ saved [1303/1303]
```
