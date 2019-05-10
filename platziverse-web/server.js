const http = require('http')
const path = require('path')
const express = require('express')
const debug = require('debug')('platziverse:web')
const socketio = require('socket.io')
const chalk = require('chalk')
const PlatziverseAgent = require('platziverse-agent')
const {pipe} = require('./utils')

const proxy = require('./proxy')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const agent = new PlatziverseAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

//sockect.io

io.on('connect', socket => {
    debug(`Connect ${socket.id}`)

   pipe(agent, socket)
})

//express Error handler
app.use((err, req, res, next) => {
  debug(`Error ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})


function handleFatalError (err) {
    console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
  }

process.on('uncaughtException', handleFatalError)
process.on('unhandledException', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[Platziverse-web]')} server listening on port ${port}`)
  agent.connect()
})
