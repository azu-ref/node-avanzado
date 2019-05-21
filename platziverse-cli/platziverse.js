#!/usr/bin/env node

// const minimist = require('minimist')

// console.log('Hello Platziverse!')

// const args = minimist(process.argv)

// console.log(args.name)
// console.log(args.host)

const args = require('args')

args
  .option('port', 'The port on which the app will be running', 3000)
  .option('reload', 'Enable/disable livereloading')
  .command('serve', 'Serve your static site', ['s'])
 
const flags = args.parse(process.argv)