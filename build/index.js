"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const farmbot_1 = require("./structures/farmbot");
const client_1 = require("./structures/client");
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(__dirname, "../config.json");
const config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
function start() {
  (0, client_1.cl_start)();
  (0, farmbot_1.startFarm)(client_1.client);
}
start();
let prefix = config.prefix || "!";
client_1.client.commands = new discord_js_selfbot_v13_1.Collection();
function getCommands(directory) {
  let files = [];
  const items = fs_1.default.readdirSync(directory);
  for (const item of items) {
    const fullPath = path_1.default.join(directory, item);
    if (fs_1.default.statSync(fullPath).isFile() && fullPath.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}
const commandsPath = path_1.default.join(__dirname, "commands");
const commandFiles = getCommands(commandsPath);
for (const filePath of commandFiles) {
  const command = require(filePath);
  if (command.name) {
    client_1.client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        client_1.client.commands.set(alias, command);
      });
    }
  }
}
client_1.client.on("messageCreate", (message) => {
  if (
    message.author.bot ||
    !message.content.startsWith(prefix) ||
    message.author.id !== client_1.client.user.id
  )
    return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = client_1.client.commands.get(commandName);
  if (!command) return;
  message.prefix = prefix;
  message.isOwnMessage = message.author.id === message.client.user?.id;
  message.sendMessage =
    message.author.id === message.client.user?.id
      ? message.channel.send.bind(message)
      : message.reply.bind(message);
  command.execute(message, args, client_1.client, prefix);
});
