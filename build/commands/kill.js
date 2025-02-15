"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
module.exports = {
  name: "pause",
  aliases: ["p"],
  execute(message, prefix, client) {
    message.channel.send("Killing the bot process.");
    logger_1.default.cmd("Kill Command has been executed");
    process.exit(0);
  },
};
