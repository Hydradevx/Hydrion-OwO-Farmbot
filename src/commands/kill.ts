import logger from "../utils/logger.js";

module.exports = {
  name: "kill",
  aliases: ["k"],
  execute(message: any, client: any) {
    message.delete();
    message.channel.send("Killing the bot process.");

    logger.cmd("Kill Command has been executed");

    setTimeout(() => {
      process.exit(0);
    }, 3000);
  },
};
