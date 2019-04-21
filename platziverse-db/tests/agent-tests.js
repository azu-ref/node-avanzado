const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
    loggin: function (){}
}

let MetricStub = {
    belongsTo: sinon.spy()
}

let AgentStub = null
let db = null
let sandbox = null


test.beforeEach(async () => {
    sandbox = sinon.createSandbox()
    AgentStub = {
        hasMany: sinon.spy()
    }

    const setupDatabase = proxyquire('../', {
        './models/agent': () => AgentStub,
        './models/metric': () => MetricStub
    })
    
    db = await setupDatabase(config)
})

test.afterEach( t  => {
    sandbox && sandbox.restore()
})

test('Agent', t => {
    t.truthy(db.Agent, 'Agent service should exit')
})

test.serial('Setup', t => {
    t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
    t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
})