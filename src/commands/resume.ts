import info from "../structures/info";

module.exports = {
  name: "resume",
  aliases: ["r"],
  execute(message: any, prefix: string, client: any) {
    info.setPaused(false);

    message.channel.send("The bot has been resumed.");

    console.log("Resume Command has been executed");

    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
