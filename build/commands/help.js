"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
module.exports = {
  name: "help",
  aliases: ["h"],
  execute(message, prefix) {
    message.channel.send(`
> ✨ **${prefix}[section] [page] ? Default is 1** ✨
>
> ✨ **${prefix}resume** - Resume the bot.
> 🛑 **${prefix}pause** - Pause the bot.
> 💀 **${prefix}kill** - Kill the bot process.
> ❓ **${prefix}help** - Show this help message.

✨ Add --info or --usage after a command to get more information about it.
✨ Selfbot crafted by \`@hydradevx\`
    `);
    logger_1.default.cmd("Help Command has been executed");
    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
