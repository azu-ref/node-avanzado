const debug = require('debug')('platziverse:db:setup')

module.exports = function config(init = true) {
    return {
      db: {
        database: process.env.DB_NAME || 'platziverse',
        username: process.env.DB_USER || 'platzi',
        password: process.env.DB_PASS || '123456',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: msg => debug(msg),
        setup: init
    },
      auth: {
        secret: process.env.SECRET || 'platzi'
      }
  }
}
