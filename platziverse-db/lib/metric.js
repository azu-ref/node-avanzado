const chalk = require('chalk')
module.exports = function setupMetricService (agentModel, metricModel) {
  async function findByAgentUuid (uuid) {
    return metricModel.findAll({
      attributes: [ 'type' ],
      group: [ 'type' ],
      include: [{
        attributes: [],
        model: agentModel,
        where: { uuid }
      }],
      raw: true
    })
  }

  async function findByTypeAgentUuid(type, uuid){
      return metricModel.findAll({
          attributes: ['id', 'type', 'value', 'createdAt'],
          where:{ type },
          limit: 20,
          order: [['createdAt', 'DESC']],
          include: [{
            attributes: [],
            model: agentModel,
            where: { uuid }
          }],
          raw: true
      })
  }

  async function create (uuid, metric) {
    const agent = await agentModel.findOne({
      where: { uuid }
    })

    if (agent) {
      Object.assign(metric, { agentId: agent.id })
      console.log(chalk.green(`${uuid} y el id: ${agent.id}`))
      const result = await metricModel.create(metric)
      return result.toJSON()
    }
  }

  return {
    create,
    findByAgentUuid,
    findByTypeAgentUuid
  }
}
