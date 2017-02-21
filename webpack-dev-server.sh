#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
node  "$basedir/node_modules/webpack-dev-server/bin/webpack-dev-server.js" "$@"
ret=$?
exit $ret