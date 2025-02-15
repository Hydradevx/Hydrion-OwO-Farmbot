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

✨ Add --info or --usage after a command to get more information about it.
✨ Selfbot crafted by \`@hydradevx\`
    `,
    );

    console.log("Help Command has been executed");

    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
