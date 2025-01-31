function start(client){
  client.login(client.token)

  require('../funcs/hunt.js')(client)
  require('./detectCaptcha.js')(client)
}

module.exports = { start }