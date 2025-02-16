"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const info_1 = __importDefault(require("../structures/info"));
const logger_1 = __importDefault(require("../utils/logger"));
module.exports = {
  name: "pause",
  aliases: ["p"],
  execute(message, prefix, client) {
    info_1.default.setPaused(true);
    message.channel.send("The bot has been paused.");
    logger_1.default.cmd("Pause Command has been executed");
    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
