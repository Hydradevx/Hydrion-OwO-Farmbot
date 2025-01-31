module.exports = async (client) => {
  function hunt(client) {
    if (!client.info.paused && !client.info.captcha) {
      client.channel.send('owo hunt')
      console.log("hunt")
    }
  }
  
 setTimeout(hunt(client), 13000)
}