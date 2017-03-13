#!/usr/bin/env bash
rm -r ./doc/*
./node_modules/.bin/jsdoc ./utilities/*.js ./services/*.js ./quiz/*.js ./charts/*.js ./charts/options/*.js ./misc/*.js ./passport/*.js ./modules/*.js routes/*.js models/*.js ./*.js test/*.js ./bin/* -d doc
cp -R doc public/
git add doc
git add public
