import { startFarm } from "./structures/farmbot";
import { cl_start, client } from "./structures/client";
import { Collection } from "discord.js-selfbot-v13";
import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

function start() {
  cl_start();
  startFarm(client);
}

start();

let prefix = config.prefix || "!";

client.commands = new Collection();

function getCommands(directory: string): string[] {
  let files: string[] = [];

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isFile() && fullPath.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

const commandsPath = path.join(__dirname, "commands");
const commandFiles = getCommands(commandsPath);

for (const filePath of commandFiles) {
  const command = require(filePath);

  if (command.name) {
    client.commands.set(command.name, command);

    if (command.aliases) {
      command.aliases.forEach((alias: string) => {
        client.commands.set(alias, command);
      });
    }
  }
}

client.on("messageCreate", (message: any) => {
  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    message.author.id !== client.user.id
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = client.commands.get(commandName!);

  if (!command) return;

  message.prefix = prefix;
  message.isOwnMessage = message.author.id === message.client.user?.id;
  message.sendMessage =
    message.author.id === message.client.user?.id
      ? message.channel.send.bind(message)
      : message.reply.bind(message);

  command.execute(message, args, client, prefix);
});
