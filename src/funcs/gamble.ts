import * as fs from "fs";
import * as path from "path";
import logger from "../utils/logger";
import info from "../structures/info";

async function execute(client: any) {
  const configPath = path.join(__dirname, "../../config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.gamble) return;

  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info.getPaused() && !info.getCaptcha()) {
        const method = getMethod();
        if (method === "slots") {
          channel.send(`owo slots ${consts.gamble.s_bet}`);
          logger.gamble(`Slots Command Executed`);
        } else {
          const side = getHeadsOrTails();
          channel.send(`owo coinflip ${side} ${consts.gamble.cf_bet}`);
          logger.gamble(`Coinflip Command Executed with Side: ${side}`);
        }
      }
    }, consts.gambleInterval);
  }
}

function getMethod(): string {
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    return "slots";
  }

  return "coinflip";
}

function getHeadsOrTails(): string {
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    return "heads";
  }

  return "tails";
}

module.exports = {
  execute,
};
