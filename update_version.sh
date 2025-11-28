#!/bin/bash

HTML_DIR="$(pwd)"
VERSION=$(date +"%Y%m%d_%H%M%S")
echo "Using version: $VERSION"

find "$HTML_DIR" -maxdepth 1 -name "*.html" | while read -r file; do
    echo "Processing $file"
    tmp=$(mktemp)

    # 使用 perl 替换更稳妥，支持多行 <link> 和 <script>
    perl -0777 -pe '
        s|(<link\b[^>]*?\bhref=")([^"?]+)(\?v=[^"]*)?(")|$1$2?v='"$VERSION"'$4|g;
        s|(<script\b[^>]*?\bsrc=")([^"?]+)(\?v=[^"]*)?(")|$1$2?v='"$VERSION"'$4|g;
    ' "$file" > "$tmp"

    mv "$tmp" "$file"
done

echo "Done."
