const http = require('http')
const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('PLatziverse:api:server')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

//Express error handler
app.use( (err, req, res, next) => {
    debug(`Error ${err.message}`)

    if(err.message.match(/not found/)){
        return res.status(404).send({ error: err.message })
    }

    res.status(500).send({ error: err.message})
})

function handleFatalError(err){
    console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

if(!module.parent){
    process.on('uncaughtException', handleFatalError)
    process.on('unhandledException', handleFatalError)

    server.listen(port, () => {
    console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
    })
}

module.exports = server
