#!/bin/bash
parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
template="$parent_path/pdf-template/Eisvogel/eisvogel.latex"
echo "using template ${template} ... done"

# make pdf directory
echo "Creating pdf folder if exists ... done"
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

  echo "using resource path = $resource_path ... done"
  echo "Generating PDF $newfile ..."
  pandoc $f --template $template --listing -o $newfile --resource-path=$resource_path
  echo "done."
done
