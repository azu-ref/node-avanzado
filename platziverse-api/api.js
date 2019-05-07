const debug = require('debug')('platziverse:api:routes')
const express = require('express')
const db = require('platziverse-db')
const auth = require('express-jwt')
const config = require('../platziverse-db/config-db')(false)

const api = express.Router()

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connected to DB')
    try {
      services = await db(config.db)
    } catch (err) {
      return next(err)
    }
    Agent = services.Agent
    Metric = services.Metric
  }
  next()
})

api.get('/agents', auth(config.auth), async (req, res, next) => {
  debug('A request has come to /agents')

  const { user } = req

  if(!user || !user.username){
    return next(new Error('Not Authorized'))
  }

  let agents = []
  try {
    if(user.admin){
      agents = await Agent.findConnected()
    }else{
      agents = await Agent.findByUsername(user.username)
    }
  } catch (e) {
    next(e)
  }
  res.send(agents)
})

api.get('/agents/:uuid', auth(config.auth), async (req, res, next) => {
  const { uuid } = req.params

  debug(`Request to /agent/${uuid}`)

  const { user } = req

  if(!user || !user.username){
    return next(new Error('Not Authorized'))
  }

  let agent
  try {    
    agent = await Agent.findByUuid(uuid)

  } catch (e) {
    next(e)
  }

  if (!agent) {
    return next(new Error(`Agent not found with uuid: ${uuid}`))
  }

  res.send(agent)
})

api.get('/metrics/:uuid', auth(config.auth), async (req, res, next) => {
  const { uuid } = req.params

  debug(`Request to /metrics/${uuid}`)

  const { user } = req

  if(!user || !user.username){
    return next(new Error('Not Authorized'))
  }

  let metrics = []
  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch (e) {
    next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent with uuid: ${uuid}`))
  }
  res.send(metrics)
})

api.get('/metrics/:uuid/:type', auth(config.auth), async (req, res, next) => {
  const { uuid, type } = req.params

  const { user } = req

  debug(`Request to /metrics/${uuid}/${type}`)

  if(!user || !user.username){
    return next(new Error('Not Authorized'))
  }

  let metrics = []
  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (e) {
    next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics (${type}) not found for agent with uuid: ${uuid}`))
  }

  res.send(metrics)
})

module.exports = api
