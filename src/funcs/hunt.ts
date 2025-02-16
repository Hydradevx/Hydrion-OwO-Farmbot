import * as fs from "fs";
import * as path from "path";
import logger from "../utils/logger";
import info from "../structures/info";
import { filtergem } from "./inventory";

async function execute(client: any) {
  const configPath = path.join(__dirname, "../../config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.hunt) return;

  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info.getPaused() && !info.getCaptcha()) {
        channel.send("owo hunt").then((message: any) => {
          const filter = (m: any) => m.content.includes("hunt");
          const collector = message.channel.createMessageCollector({
            filter,
            max: 1,
            time: 10000,
          });
          collector.on("collect", (m: any) => {
            filtergem(m);
            collector.stop();
          });
        });
        logger.hunt(`Hunt Command Executed`);
      }
    }, consts.huntInterval);
  }
}

module.exports = {
  execute,
};
