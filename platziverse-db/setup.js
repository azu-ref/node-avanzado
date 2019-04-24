const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule() 
const flagg = '--init'

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

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || '123456',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: msg => debug(msg),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Succes!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[FATAL ERROR]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
