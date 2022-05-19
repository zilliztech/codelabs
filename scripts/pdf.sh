#!/bin/bash
# setup file path
parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
template="$parent_path/pdf-template/Eisvogel/eisvogel.latex"
output="$parent_path/../pdf"
echo "Preparing template ${template} ... done"

# ensure pdf directory
echo "Preparing out $output if exists ... done"
mkdir -p $output

# go to codelabs
cd codelabs
# get all files
# FILES=find . -name '*.md'
set -e
# convert md to codelabs format
for f in $(find . -name "*.pdf.md"); do
  resource_path="$(dirname $f)"
  filename="$(basename $f)"
  newfile="$output/$(echo $filename | sed -e 's/\.pdf.md/.pdf/')"

  # echo "using resource path = $resource_path ... done"
  echo "Generating PDF $newfile ..."
  pandoc $f --template $template --listing -o $newfile --resource-path=$resource_path
  echo "Done."
done

ls $output
