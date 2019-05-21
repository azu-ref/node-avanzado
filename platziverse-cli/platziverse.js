#!/usr/bin/env node

const minimist = require('minimist')

console.log('Hello Platziverse!')

const args = minimist(process.argv)

console.log(args.name)
console.log(args.host)