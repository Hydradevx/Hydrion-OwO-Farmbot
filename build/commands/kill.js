"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = __importDefault(require("../utils/logger.js"));
module.exports = {
  name: "kill",
  aliases: ["k"],
  execute(message, client) {
    message.delete();
    message.channel.send("Killing the bot process.");
    logger_js_1.default.cmd("Kill Command has been executed");
    setTimeout(() => {
      process.exit(0);
    }, 3000);
  },
};
