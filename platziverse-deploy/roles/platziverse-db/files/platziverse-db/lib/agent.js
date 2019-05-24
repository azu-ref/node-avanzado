module.exports = function setupAgentService (agentModel) {
  async function createOrUpdate (agent) {
    const cond = {
      where: {
        uuid: agent.uuid
      }
    }

    const existingAgent = await agentModel.findOne(cond)

    if (existingAgent) {
      const updated = await agentModel.update(agent, cond)

      return updated ? agentModel.findOne(cond) : existingAgent
    }

    const createdResult = await agentModel.create(agent)
    return createdResult.toJSON()
  }

  function findById (id) {
    return agentModel.findById(id)
  }

  function findByUuid (uuid) {
    return agentModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return agentModel.findAll()
  }

  function findConnected () {
    return agentModel.findAll({
      where: {
        connected: true
      }
    })
  }

  function findByUsername (username) {
    return agentModel.findAll({
      where: {
        username,
        connected: true
      }
    })
  }

  return { findById,
    createOrUpdate,
    findByUuid,
    findAll,
    findConnected,
    findByUsername }
}
