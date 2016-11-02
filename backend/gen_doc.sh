#!/usr/bin/env bash
rm -r ./doc/*
./node_modules/.bin/jsdoc ./modules/*.js routes/*.js models/*.js ./*.js -d doc

