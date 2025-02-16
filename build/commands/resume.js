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
  name: "resume",
  aliases: ["r"],
  execute(message, prefix, client) {
    info_1.default.setPaused(false);
    message.channel.send("The bot has been resumed.");
    logger_1.default.cmd("Resume Command has been executed");
    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
