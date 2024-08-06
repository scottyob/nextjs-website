#!/bin/bash

# Check if a name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

# Get the name from the argument, convert to lowercase, and replace spaces with hyphens
name=$(echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Get the current date in the format YYYY-MM-DD
current_date=$(date +"%Y-%m-%d")

# Create the directory path
directory_path="siteContent/posts/${current_date}-${name}"

# Create the directory
mkdir -p "$directory_path"

# Define the content of the page.mdx file
page_content="---
title: '${1}'
type: post
author: scottyob
date: ${current_date}
categories:
 - programming
tags:
 - tag
hero: hero.jpg 

---

"

# Write the content to page.mdx inside the created directory
echo "$page_content" > "${directory_path}/page.mdx"

# Output success message
echo "Directory and page.mdx created successfully at ${directory_path}"
