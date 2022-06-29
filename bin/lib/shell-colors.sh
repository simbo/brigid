#!/bin/bash

# ------------------------------------------------------------------------------
# A collection of variables to add ANSI formatting to shell output, respecting
# the capabilities of the current shell environment
# ------------------------------------------------------------------------------

black="$(tput -T${TERM:-"dumb"} setaf 0)";
red="$(tput -T${TERM:-"dumb"} setaf 1)";
green="$(tput -T${TERM:-"dumb"} setaf 2)";
yellow="$(tput -T${TERM:-"dumb"} setaf 3)";
blue="$(tput -T${TERM:-"dumb"} setaf 4)";
magenta="$(tput -T${TERM:-"dumb"} setaf 5)";
cyan="$(tput -T${TERM:-"dumb"} setaf 6)";
lightGray="$(tput -T${TERM:-"dumb"} setaf 7)";

gray=$(tput -T${TERM:-"dumb"} setaf 8)
lightRed=$(tput -T${TERM:-"dumb"} setaf 9)
lightGreen=$(tput -T${TERM:-"dumb"} setaf 10)
lightYellow=$(tput -T${TERM:-"dumb"} setaf 11)
lightBlue=$(tput -T${TERM:-"dumb"} setaf 12)
lightMagenta=$(tput -T${TERM:-"dumb"} setaf 13)
lightCyan=$(tput -T${TERM:-"dumb"} setaf 14)
white=$(tput -T${TERM:-"dumb"} setaf 15)

bgBlack="$(tput -T${TERM:-"dumb"} setab 0)";
bgRed="$(tput -T${TERM:-"dumb"} setab 1)";
bgGreen="$(tput -T${TERM:-"dumb"} setab 2)";
bgYellow="$(tput -T${TERM:-"dumb"} setab 3)";
bgBlue="$(tput -T${TERM:-"dumb"} setab 4)";
bgMagenta="$(tput -T${TERM:-"dumb"} setab 5)";
bgCyan="$(tput -T${TERM:-"dumb"} setab 6)";
bgLightGray="$(tput -T${TERM:-"dumb"} setab 7)";

bgGray=$(tput -T${TERM:-"dumb"} setab 8)
bgLightRed=$(tput -T${TERM:-"dumb"} setab 9)
bgLightGreen=$(tput -T${TERM:-"dumb"} setab 10)
bgLightYellow=$(tput -T${TERM:-"dumb"} setab 11)
bgLightBlue=$(tput -T${TERM:-"dumb"} setab 12)
bgLightMagenta=$(tput -T${TERM:-"dumb"} setab 13)
bgLightCyan=$(tput -T${TERM:-"dumb"} setab 14)
bgWhite=$(tput -T${TERM:-"dumb"} setab 15)

bold=$(tput -T${TERM:-"dumb"} bold)
dim=$(tput -T${TERM:-"dumb"} dim)
underline=$(tput -T${TERM:-"dumb"} smul)

normal=$(tput -T${TERM:-"dumb"} sgr0)
