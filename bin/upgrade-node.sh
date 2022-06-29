#!/bin/bash

# ------------------------------------------------------------------------------
# This script does...
#  - retrieve latest node.js lts version by scraping nodejs.org
#  - update .nvmrc with latest node.js version
#  - if nvm is available
#     - switch to latest node.js lts version
#     - reinstall packages
# ------------------------------------------------------------------------------

rootDir=$(dirname $(cd "$(dirname "$0")" ; pwd -P))
source $rootDir/bin/lib/sedx.sh
source $rootDir/bin/lib/shell-colors.sh

if [[ "$target" = "" ]]; then
  printf "\nUsage:\n"
  printf "\n  $0 <backend|frontend>\n\n"
  exit 1
fi

set -e

# get current node version from .nvmrc
currentNode=$(cat $rootDir/$target/.nvmrc | xargs)

printf "\n${yellow}${bold}Retrieving latest node.js lts version from ${lightBlue}${underline}https://nodejs.org/${normal}${yellow}${bold} website...${normal}\n\n"

# get latest node.js lts version from nodejs.org
latestNode=$(curl --silent https://nodejs.org/en/ | grep -m 1 LTS | sedxInput "s/.*data-version=\"v([0-9]+\.[0-9]+\.[0-9]+).*/\\1/" | xargs)

# if node version was updated...
if [ "$latestNode" != "$currentNode" ]; then

  # find deb file for this version
  latestNodeMajor=$(echo "${latestNode}" | cut -d . -f 1)
  nodeDebBaseUrl="https://deb.nodesource.com/node_${latestNodeMajor}.x/pool/main/n/nodejs/"
  nodeDebFile=$(curl -v --silent ${nodeDebBaseUrl} 2>&1 | grep ${latestNode} | grep -m1 amd64 | sed -r -e 's/.*href="([^"]+).*/\1/')

  if [ "$nodeDebFile" == "" ]; then
    printf "\n${red}${bold}Found new node.js version ${latestNode} but no matching deb file at ${blue}${nodeDebBaseUrl}${red}.${normal}\n\n"
    exit 1
  fi

  # update .nvmrc
  printf "\n${yellow}${bold}Updating .nvmrc to latest node.js lts version ${latestNode}...${normal}\n\n"
  echo "${latestNode}" > $rootDir/$target/.nvmrc
  echo "${latestNode}" > $rootDir/backend/.nvmrc

  # update package.json
  printf "\n${yellow}${bold}Updating package.json's engine definition and node types to node.js lts version ${latestNode}...${normal}\n\n"
  sedxFile "s|(\"node\":\ \"\^)([0-9]+)(\")|\1${latestNodeMajor}\3|" $rootDir/$target/package.json
  sedxFile "s|(\"@types/node\":\ \"\^)([0-9]+)(\")|\1${latestNodeMajor}\3|" $rootDir/$target/package.json


  # print instructions
  printf "\n${white}${bold}Node.js version in .nvmrc and package.json for ${target} were updated to ${latestNode}.${normal}"
  printf "\n${white}${bold}Please install and use that version and reinstall your packages using the following command in backend and frontend directories:"
  printf "\n${yellow}cd ${target} && nvm install \$(cat .nvmrc | xargs) && yarn install${normal}\n\n"

else

  printf "\n${white}${bold}Node.js version did not change.\n(latest lts version is ${latestNode})${normal}\n\n"

fi
