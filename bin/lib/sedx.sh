#!/bin/bash

# ------------------------------------------------------------------------------
# This script provides an alias for sed with respective params depending on the
# current operating system.
# ------------------------------------------------------------------------------

# sed command for file replacements
function sedxFile() {
  if [ "$(uname -s | xargs)" = "Darwin" ]; then
    sed -E -i "" -e "$@"
  else
    sed -r -i -e "$@"
  fi
}

# sed command for STDIN replacements
function sedxInput() {
  if [ "$(uname -s | xargs)" = "Darwin" ]; then
    sed -E -e "$@"
  else
    sed -r -e "$@"
  fi
}
