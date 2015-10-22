#!/bin/bash
# Install node modules and bower packages.
set -e

# NPM failes to run this as a 'postinstall' command inside Docker container.
# It failes with:
#   npm WARN cannot run in wd @ bower install --allow-root (wd=/data)
# Therefore must be ran manually.
bower install --allow-root

npm install
grunt build
