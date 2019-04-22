const setupDatabse = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')
const setupAgentService = require('./lib/agent')
const defaults = require('defaults')

module.exports = async function config (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 10,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabse(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true }) // borra la base de datos y la crea de nuevo
  }

  const Agent = setupAgentService(AgentModel)
  const Metric = {}

  return { Agent, Metric }
}
