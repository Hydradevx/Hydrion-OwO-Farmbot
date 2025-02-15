import logger from "../utils/logger";

module.exports = {
  name: "pause",
  aliases: ["p"],
  execute(message: any, prefix: string, client: any) {
    message.channel.send("Killing the bot process.");

    logger.cmd("Kill Command has been executed");

    process.exit(0);
  },
};
