#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run this script whit root privileges"
  exit
fi
echo "Checking environment..."
if ! type git > /dev/null; then
	echo "Installing git..."
	apt-get install git
fi
if type git > /dev/null; then
	git --version
fi

if ! type npm > /dev/null; then
	echo "Installing npm...";
	apt-get install npm
fi
if type npm > /dev/null; then
	var=$(npm --version)
	echo "npm version" $var
fi

if ! type nodemon > /dev/null; then
	echo "Installing nodemon...";
	npm i -g npm n nodemon
fi
if type nodemon > /dev/null; then
	var=$(nodemon --version)
	echo "Nodemon version" $var
fi

n 8.0.0
echo "Node.js version 8.0.0"

if ! type mongo > /dev/null; then
	echo "Installing mongodb...";
	apt-get install mongodb
fi
if type mongo > /dev/null; then
	mongo --version
fi