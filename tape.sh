#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
"$basedir/node_modules/tape/bin/tape" "./test/*/*Spec.js"
ret=$?
exit $ret
