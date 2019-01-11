#!/bin/bash
rm -rf dist
mkdir -p dist/public
cp package.json dist
cp package-lock.json dist
cp index.html dist
cp bundle.js dist
cp bundle-back.js dist
cp -R public/css dist/public
cd dist
tar -czvf ../runlog.tar.gz *
cd ..
