const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')

const backend = {
    type: 'redis',
    redis,
    return_buffers: true 
}

const settings = {
    port: 1883,
    backend
}

const config = require('../platziverse-db/config-db')(false)

const server = new mosca.Server(settings)

let Agent, Metric

server.on('clientConnected', client => {
    debug(`Client connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
    debug(`Client disconnected: ${client.id}`)
})

server.on('published', (packet, client) => {
    debug(`Received: ${packet.topic}`)
    debug(`Payload: ${packet.payload}`)
})

server.on('ready', async () => {
    const services = await db(config).catch(handleFatalError)

    Agent = services.Agent
    Metric = services.Metric
    
    console.log(`${chalk.green('[platziverse-mqtt]')} is runnig` )
})

server.on('error', handleFatalError)

function handleFatalError(err){
    console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

server.on('uncaughtException', handleFatalError)
server.on('unhandledRejection', handleFatalError)