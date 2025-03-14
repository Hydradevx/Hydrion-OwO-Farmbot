import logger from "../utils/logger.js";

module.exports = {
  name: "help",
  aliases: ["h"],
  execute(message: any, prefix: string) {
    message.channel.send(
      `
> ✨ **${prefix}[section] [page] ? Default is 1** ✨
> 
> ✨ **${prefix}resume** - Resume the bot.
> 🛑 **${prefix}pause** - Pause the bot.
> 💀 **${prefix}kill** - Kill the bot process.
> ❓ **${prefix}help** - Show this help message.
> 📊 **${prefix}stats** - Shows the bot stats.
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `,
    );

    logger.cmd("Help Command has been executed");

    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
