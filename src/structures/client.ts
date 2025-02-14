import { Client } from "discord.js-selfbot-v13";
const logger = require("../utils/logger");
import fs from "fs";

let config = fs.readFileSync("../../config.json");

const client = new Client();

client.on("ready", async () => {
  logger.status(`Logged in as ${client.user.tag}`);
});

client.login(config.token);
