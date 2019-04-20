const setupDatabse = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function config (config) {
  const sequelize = setupDatabse(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true }) //borra la base de datos y la crea de nuevo
  }

  const Agent = {}
  const Metric = {}

  return { Agent, Metric }
}
