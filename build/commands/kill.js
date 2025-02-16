import logger from "../utils/logger";
module.exports = {
  name: "kill",
  aliases: ["k"],
  execute(message, client) {
    message.delete();
    message.channel.send("Killing the bot process.");
    logger.cmd("Kill Command has been executed");
    setTimeout(() => {
      process.exit(0);
    }, 3000);
  },
};
