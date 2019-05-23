const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule() 
const flagg = '--yes'

async function setup () {
  if(process.argv[2] !== flagg){
    const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy yuor databse, are you sure?'
    }
  ])
  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }}

  const config = require('./config-db')()

  await db(config.db).catch(handleFatalError)

  console.log('Succes!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
