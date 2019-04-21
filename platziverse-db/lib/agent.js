module.exports = function setupAgentService(agentModel){
    function findById(id){
        return agentModel.findById(id)
    }

    return { findById }
}