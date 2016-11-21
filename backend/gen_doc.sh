#!/usr/bin/env bash
rm -r ./doc/*
./node_modules/.bin/jsdoc ./modules/*.js ./modules/functions/*.js ./modules/graphics/*.js routes/*.js models/*.js ./*.js test/*.js ./bin/* -d doc

