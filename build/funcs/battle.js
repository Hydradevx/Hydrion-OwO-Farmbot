import * as fs from "fs";
import * as path from "path";
import logger from "../utils/logger";
import info from "../structures/info";
async function execute(client) {
  const configPath = path.join(__dirname, "../../config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.battle) return;
  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info.getPaused() && !info.getCaptcha()) {
        channel.send("owo battle");
        logger.battle(`Battle Command Executed`);
      }
    }, consts.battleInterval);
  }
}
module.exports = {
  execute,
};
