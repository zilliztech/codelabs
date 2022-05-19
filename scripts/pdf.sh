#!/bin/bash
# make pdf directory
mkdir -p pdf

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
  pandoc $f --template ../pdf-template/Eisvogel/eisvogel.latex --listing -o $newfile --resource-path=$resource_path
done
