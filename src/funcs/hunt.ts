import * as fs from "fs";
import * as path from "path";
import logger from "../utils/logger";
import info from "../structures/info";

async function execute(client: any) {
  const configPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info.getPaused()) {
        channel.send("owo hunt");
        logger.hunt(`Hunt Command Executed`);
      }
    }, consts.huntInterval);
  }
}

module.exports = {
  execute,
};
