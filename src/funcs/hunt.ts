import { Client } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";

export default function execute(client: Client) {
  const configPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const channelId = consts.channelid;

  client.on("ready", async () => {
    const channel = await client.channels.cache.get(channelId);
    if (channel && channel.isText()) {
      setInterval(() => {
        channel.send("owo hunt");
        logger.hunt(`Hunt Command Executed`);
      }, 13000);
    }
  });
}