#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
node  "$basedir/node_modules/webpack/bin/webpack.js" "$@"
ret=$?
exit $ret
