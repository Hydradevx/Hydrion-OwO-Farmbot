import info from "../structures/info.js";
import logger from "../utils/logger.js";

module.exports = {
  name: "pause",
  aliases: ["p"],
  execute(message: any, prefix: string, client: any) {
    info.setPaused(true);

    message.channel.send("The bot has been paused.");

    logger.cmd("Pause Command has been executed");

    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
