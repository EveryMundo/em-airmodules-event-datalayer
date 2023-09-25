#!/bin/bash

# Read version from package.json
VERSION=$(node -p "require('./package.json').version")

# Create version.js file in src/ folder
echo "export const version = '$VERSION';" > src/version.js

# Create version.js file in dist/esm/ folder
echo "export const version = '$VERSION';" > dist/esm/version.js

# Create version.js file in dist/cjs/ folder
echo "exports.version = '$VERSION';" > dist/cjs/version.js