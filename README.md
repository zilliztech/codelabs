# Codelabs

## Install dependencies

```
yarn install
```

## Convert codelabs markdown to html

```
./convert.sh
```

## preview server

```
# preview milvus codelab
yarn dev-milvus

# preview towhee codelab
yarn towhee
```

## Suuported syntax

### Markdown frontmatter

Each markdown must contain meta information at the head of the document, so that the web system can recognize it as a codelabs

```
summary: How to install cpu-only milvus in minutes
id: how-to-install-cpu-only-milvus-in-minutes
categories: milvus
tags: installation
status: Published
authors: Brother Long
Feedback Link: https
```

#### PDF meta

These fields are used to generate PDF documents, it will generated automatically, you can overwrite them in the frontmatter of the markdown

```
author: "@Zilliz.com"
date: 5/20/2022
titlepage: true
titlepage-color: 175FFF
titlepage-text-color: FFFFFF
titlepage-rule-color: FFFFFF
title: How to install cpu-only milvus in minutes
```

### Info Boxes

Plain Text followed by green and yellow info boxes

```md
Negative
: If you're using Windows make sure to set your text editor to use UNIX line endings!
```

```md
Positive
: This will appear in a green info box.
```

You created info boxes!

### Bullets

Plain Text followed by bullets

```md
- Hello
- CodeLab
- World
```

You created bullets!

### Numbered List

```md
1. List
1. Using
1. Numbers
```

You created a numbered list!

### Embed an iframe

```md
![https://codepen.io/tzoght/embed/yRNZaP](https://en.wikipedia.org/wiki/File:Example.jpg 'Try Me Publisher')
```

### Youtube video

```html
<video id="mdmtWPqTf-w"></video>
```

### Code block

```python
# Run `python3` in your terminal to operate in the Python interactive mode.
from pymilvus import connections
connections.connect(
  alias="default",
  host='localhost',
  port='19530'
)
```
