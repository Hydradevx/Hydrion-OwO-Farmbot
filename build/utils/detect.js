"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = detect;
const client_1 = require("../structures/client");
const info_1 = __importDefault(require("../structures/info"));
const logger_1 = __importDefault(require("../utils/logger"));
const detectCaptcha = (msg, check1, check2) => {
  const captchawords = [".com", "link", "please use the link"];
  const iscaptcha = captchawords.some((word) => msg.includes(word));
  if (iscaptcha && !check1 && !check2) {
    return true;
  }
};
const removeInvis = (input) => {
  const invisibleChar = /[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g;
  return input.replace(invisibleChar, "");
};
async function detect(message) {
  if (
    message.author.id === "408785106942164992" &&
    message.channel.id === client_1.client.config.channel
  ) {
    let msg = removeInvis(message.content.toLowerCase());
    if (
      (msg.includes("captcha") ||
        msg.includes("please complete your captcha") ||
        msg.includes("please use the link") ||
        msg.includes("please use the link below so i can check") ||
        msg.includes("are you a real human") ||
        msg.includes("verify that you are human")) &&
      !info_1.default.captcha
    ) {
      info_1.default.setCaptcha(true);
      info_1.default.increaseCaptcha();
      if (
        message.components.length > 0 &&
        message.components[0].components[0]
      ) {
        let check1 = message.components[0].components.find(
          (button) => button.url.toLowerCase() === "owobot.com",
        );
        let check2 = message.components[0].components[0].url
          .toLowerCase()
          .includes("owobot.com");
        if (detectCaptcha(msg, check1, check2) === true) {
          logger_1.default.status("captcha detected");
          info_1.default.setCaptcha(true);
          info_1.default.increaseCaptcha();
        }
      }
    }
    if (msg.includes("i have verified that you are human")) {
      info_1.default.setCaptcha(false);
    }
  }
}
