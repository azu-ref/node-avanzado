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
    const agent = agentModel.findOne({
      where: { uuid }
    })

    if (agent) {
      Object.assign(metric, { agentId: agent.Id })
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
