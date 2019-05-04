const http = require('http')
const express = require('express')
const chalk = require('chalk')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`${chalk.green('[platziverse-api]')} server listening on port ${port}`)
})