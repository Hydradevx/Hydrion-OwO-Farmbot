import * as fs from "fs";
import * as path from "path";
import logger from "../utils/logger";

function execute(client: any) {
  const configPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const channelId = consts.channelId;
 // add client. on ready async for each func
  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText()) {
    setInterval(() => {
      channel.send("owo hunt");
      logger.hunt(`Hunt Command Executed`);
    }, consts.huntInterval);
  }
}

module.exports = {
  execute,
};
