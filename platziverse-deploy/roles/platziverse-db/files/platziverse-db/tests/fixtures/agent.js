const agent = {
  id: 1,
  uuid: 'yyy-yyy-yyy',
  name: 'fixture',
  username: 'platzi',
  hostname: 'test-host',
  pid: 0,
  connected: true,
  createdAt: new Date(),
  updateAt: new Date()
}

const agents = [
  agent,
  extend(agent, { id: 2, uuid: 'yyy-xxx-www', username: 'test', connected: false }),
  extend(agent, { id: 3, uuid: 'yyy-xwx-wyw', username: 'prueba' }),
  extend(agent, { id: 4, uuid: 'yyy-xwx-wxw', username: 'testeador' })
]

function extend (obj, values) {
  return {
    ...obj,
    id: values.id,
    uuid: values.uuid,
    username: values.username,
    connected: values.connected === false ? values.connected : true
  }
}

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(a => a.connected),
  platzi: agents.filter(a => a.username === 'platzi'),
  byUuid: id => agents.filter(a => a.uuid === id).shift(),
  byId: id => agents.filter(a => a.id === id).shift()
}
