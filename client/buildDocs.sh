#!/bin/sh

jsdoc src -r  -c jsdoc.conf.json -d docs/jsdoc
docco src/js/app/*.js src/js/app/**/*.js src/js/app/**/**/*.js -o docs/docco

