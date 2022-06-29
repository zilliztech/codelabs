summary: Getting started with Milvus - the world's most popular open-source vector database.
id: getting-started-with-vector-databases-introduction-to-milvus
categories: Getting Started
tags: getting-started
status: Published
authors: Frank Liu
Feedback Link: https://github.com/milvus-io/milvus

---

# Getting Started with Vector Database - Milvus Quickstart

Hey there - welcome back to Milvus codelabs. In the previous tutorial, we provided a brief introduction to Milvus, Milvus' history, as well as the primary differences between Milvus 1.x and Milvus 2.x. We also took a quick tour of the architecture of Milvus 2.x and helped shine some light on how Milvus' architecture allows it to implement all of the required features of vector databases.

## Let's get started

If you haven't read the previous tutorials ([unstructured data](), [vector databases](), [Milvus introduction]()), I recommend you go ahead and read them. If you have, great. Let's get started with Milvus!

We offer two different modes of deployment: standalone and cluster. In Milvus standalone, all nodes - coordinators, worker nodes, and forward-facing proxies - are deployed as a single instance. For persistent data and metadata, Milvus standalone relies on `MinIO` and `etcd`, respectively. In future releases, we hope to eliminate these two third-party dependencies, allowing everything to run in a single process and removing the need to install third-party dependencies.

Milvus cluster is our full-fledged version of Milvus, complete with separate instances/pods for all eight microservice components along with three third-party dependencies: `MinIO`, `etcd`, and `Pulsar` (Pulsar serves as the log broker and provides log pub/sub services). If you haven't gotten the chance to take a look at the Milvus overview from the previous slide, please do so! It'll help clarify what each of these third party dependencies is used for and why we've included them in Milvus cluster.

## Milvus standalone (`docker-compose`)

Milvus standalone is meant to be super easy to install. In this section, we'll go over how `docker-compose` can be used to install Milvus. You can view the recommended prerequisites [here](https://github.com/milvus-io/milvus-docs/blob/v2.0.x/site/en/getstarted/prerequisite-docker.md).

Let's first download the [`docker-compose.yml`](https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml) configuration file needed for the standalone installation. If you're on any Debian-based Linux (including Ubuntu), you can use the following command:

```shell
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -O docker-compose.yml
```

Alternatively, if you're on MacOS, make sure you have [Docker Desktop]() installed first. I recommend using `brew`:

```shell
% brew install --cask docker
```

You can then follow this up with the command below:

```shell
% curl https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -o docker-compose.yml
```

With everything ready, we can now spin up our Milvus standalone instance:

```shell
$ docker-compose up -d
```

    Docker Compose is now in the Docker CLI, try `docker compose up`
    Creating milvus-etcd  ... done
    Creating milvus-minio ... done
    Creating milvus-standalone ... done


Now, we can check on the status of our containers

```shell
$ docker ps -a
```

```
CONTAINER ID   IMAGE                                      COMMAND                  CREATED          STATUS                    PORTS                      NAMES
711d54ab15c7   milvusdb/milvus:v2.0.2                     "/tini -- milvus run…"   42 seconds ago   Up 40 seconds             0.0.0.0:19530->19530/tcp   milvus-standalone
0d85f4927864   minio/minio:RELEASE.2020-12-03T00-03-10Z   "/usr/bin/docker-ent…"   42 seconds ago   Up 40 seconds (healthy)   9000/tcp                   milvus-minio
99de39278b35   quay.io/coreos/etcd:v3.5.0                 "etcd -advertise-cli…"   42 seconds ago   Up 40 seconds             2379-2380/tcp              milvus-etcd
```

Here's a quick rundown of what each of the containers are doing. `milvus-standalone` is the compiled/compressed version of Milvus, mean to run on a single machine.

To stop Milvus standalone, run:

```
$ docker-compose down
```

And that's it for Milvus standalone! Easy, right?

## Milvus standalone (`apt`)

We also provide a handy `apt` package for Debian-based distributions. Simply run:

```shell
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus
$ sudo apt update
$ sudo apt install milvus
```

Once that's done, you're good to go. You can check the status of the running services with:

```shell
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

## Milvus cluster



## Milvus on AWS

If you're interested in running Milvus on cloud infrastructure check out the [Milvus standalone on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-hzmmt4xyvi7ei).

## Wrapping up

In this tutorial, we took a look at how to install the standalone version of Milvus (via `docker-compose`) and the cluster version of Milvus (via `helm`) The standalone version is suitable for testing purposes, while the cluster version is suitable for internal clusters or on-premises deployments. In the next tutorial, we'll look at basic Milvus operations: connecting to a Milvus server, creating a collection (equivalent to a table in relational databases), creating a partition within the collection, inserting embedding vector data, and conducting a vector search.

See you in the next couple of tutorials.
