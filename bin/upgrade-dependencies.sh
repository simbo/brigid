#!/bin/bash

rootDir=$(dirname $(cd "$(dirname "$0")" ; pwd -P))
source $rootDir/bin/lib/shell-colors.sh

target=${1:-""}

if [[ "$target" = "" ]]; then
  printf "\nUsage:\n"
  printf "\n  $0 <backend|frontend>\n\n"
  exit 1
fi

# packages excluded for automatic updates
excluded=typescript,chalk

function upgrade-deps() {
  $rootDir/$target/node_modules/.bin/ncu -p yarn $@
}

set -e

cd $rootDir/$target

printf "\n${yellow}${bold}Automatically upgrading to minor version updates of dependencies...${normal}\n\n"

upgrade-deps -u -t minor -x $excluded

printf "\n${yellow}${bold}Manually select whether you want to upgrade other dependencies...${normal}\n\n"

upgrade-deps --interactive -x ${excluded},@types/node

printf "\n${yellow}${bold}Installing upgraded dependencies...${normal}\n\n"

yarn install
