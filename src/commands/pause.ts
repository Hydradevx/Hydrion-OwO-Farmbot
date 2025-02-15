module.exports = {
  name: "pause",
  aliases: ["p"],
  execute(message: any, prefix: string, client: any) {
    client.info.paused = true;

    message.channel.send("The bot has been paused.");

    console.log("Pause Command has been executed");

    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
