#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run this script whit root privileges"
  exit
fi
apt-get install git
apt-get install npm
npm i -g npm
npm i -g n
n 8.0.0
apt-get install mongodb
npm i -g nodemon