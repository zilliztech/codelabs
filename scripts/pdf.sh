#!/bin/bash
# make pdf directory
echo "Create pdf folder if exists"
mkdir -p pdf
pwd
# go to codelabs
cd codelabs
# get all files
# FILES=find . -name '*.md'
set -e
# convert md to codelabs format
for f in $(find . -name "*.pdf.md"); do
  resource_path="$(dirname $f)"
  newfile="$(echo $f | sed -e 's/\.pdf.md/.pdf/')"

  echo "$resource_path"
  echo "Generating PDF $newfile ..."
  echo "The script you are running has basename $(basename "$0"), dirname $(dirname "$0")"
  echo "The present working directory is $(pwd)"
  pandoc $f --template pdf-template/Eisvogel/eisvogel.latex --listing -o $newfile --resource-path=$resource_path
done
