import { Client } from "discord.js-selfbot-v13";
import logger from "../utils/logger.js";
import fs from "fs";
import path from "path";
import { rpc } from "../utils/rpc.js";

interface Config {
  token: string;
}

let configPath = path.join(__dirname, "../../config.json");
let config: Config;

if (fs.existsSync(configPath)) {
  const configFile = fs.readFileSync(configPath, "utf-8");
  config = JSON.parse(configFile);
} else {
  logger.error("Config file not found!");
  process.exit();
}

export const client: any = new Client();

client.on("ready", async () => {
  if (client.user) {
    logger.status(`Logged in as ${client.user.tag}`);
    rpc(client);
  }
});

export function cl_start() {
  client.login(config.token);
}
