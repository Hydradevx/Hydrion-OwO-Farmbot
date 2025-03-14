"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const info_js_1 = __importDefault(require("../structures/info.js"));
module.exports = {
  name: "stats",
  aliases: ["s"],
  execute(message, prefix) {
    const stats = `
> 📊 **Statistics**
> 
> 🔄 **Paused:** ${info_js_1.default.paused ? "Yes" : "No"}
> 🧩 **Captcha Required:** ${info_js_1.default.captcha ? "Yes" : "No"}
> 🔢 **Total Captchas Solved:** ${info_js_1.default.totalcaptcha}
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
    message.channel.send(stats);
    logger_js_1.default.cmd("Stats Command has been executed");
    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
