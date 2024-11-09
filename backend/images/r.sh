#!/bin/bash

# Function to rename images in a given set folder
rename_images() {
    local set_folder=$1
    local set_number=$2
    local count=1

    for img in "$set_folder"/*.jpg; {
        mv "$img" "${set_folder}/${set_number}_image_${count}.jpg"
        count=$((count + 1))
    }
}

# Rename images in set1
rename_images "set1" 1

# Rename images in set2
rename_images "set2" 2

echo "Renaming completed."
