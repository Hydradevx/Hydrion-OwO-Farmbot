import info from "../structures/info.js";
import logger from "../utils/logger.js";
module.exports = {
  name: "resume",
  aliases: ["r"],
  execute(message, prefix, client) {
    info.setPaused(false);
    message.channel.send("The bot has been resumed.");
    logger.cmd("Resume Command has been executed");
    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
