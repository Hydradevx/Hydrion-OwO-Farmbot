import fs from "fs";
import path from "path";

import logger from "../utils/logger.js";
import info from "../structures/info.js";

function getOption() {
  const options = ["pray", "curse"];
  return options[Math.floor(Math.random() * options.length)];
}

async function execute(client: any) {
  const configPath = path.join(__dirname, "../../config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.luck) return;

  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);

  const option: any = getOption();
  channel.send(`owo ${option} <@&408785106942164992>`);
  logger.luck(`Luck Command Executed with Option: ${option}`);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info.getPaused() && !info.getCaptcha()) {
        const option: any = getOption();
        channel.send(`owo ${option} <@&408785106942164992>`);
        logger.luck(`Luck Command Executed with Option: ${option}`);
      }
    }, consts.luckInterval);
  }
}

module.exports = {
  execute,
};
