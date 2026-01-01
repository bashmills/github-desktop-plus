#!/usr/bin/env bash

set -o errexit
set -o nounset

# Apply an ImageMagick -modulate transformation to PNG icons
#
#   $1 - argument for the ImageMagick `-modulate` flag
#
function modulate_pngs() {
    modulate_arg="$1"
    
    for png_file in *.png; do
        if [[ -f "$png_file" ]]; then
            filename="${png_file%.*}"
            out_file="$filename.png"
            magick "$png_file" -modulate "$modulate_arg" "$out_file"
        fi
    done
}

modulate_pngs "100,100,60"
