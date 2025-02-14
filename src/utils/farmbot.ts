import { Client } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";

export function startFarm(client: Client) {
  const files = fs.readdirSync(path.join(__dirname, "../funcs"));
  files.forEach((file) => {
    const func = require(path.join(__dirname, "../funcs", file));
    if (func.execute) func.execute(client);
  });
}
