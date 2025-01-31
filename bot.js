const Discord = require('discord.js-selfbot-v13');
const fs = require('fs')

const main = new Discord.Client();

const config = fs.readFileSync('./config.json', 'utf-8')
const settings = fs.readFileSync('./settings.json', 'utf-8')

const prefix = settings.prefix;
const { m_info } = require('./utils/mainInfo.js')
let channel = main.channels.cache.get(config.channelid)

main.token = settings.main_token;
main.config = config
main.info = m_info
main.channel = channel