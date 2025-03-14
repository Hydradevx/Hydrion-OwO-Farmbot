"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = detect;
const client_js_1 = require("../structures/client.js");
const info_js_1 = __importDefault(require("../structures/info.js"));
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configPath = path_1.default.join(__dirname, "../../config.json");
const config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
const gamble_js_1 = require("../funcs/gamble.js");
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
  if (message.author.id === "408785106942164992") {
    let msg = removeInvis(message.content.toLowerCase());
    if (
      (msg.includes("captcha") ||
        msg.includes("please complete your captcha") ||
        msg.includes("please use the link") ||
        msg.includes("please use the link below so i can check") ||
        msg.includes("are you a real human") ||
        msg.includes("verify that you are human")) &&
      !info_js_1.default.captcha
    ) {
      info_js_1.default.setCaptcha(true);
      info_js_1.default.increaseCaptcha();
      logger_js_1.default.status("captcha detected");
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
          logger_js_1.default.status("captcha detected");
          info_js_1.default.setCaptcha(true);
          info_js_1.default.increaseCaptcha();
        }
      }
    }
    if (msg.includes("i have verified that you are human")) {
      info_js_1.default.setCaptcha(false);
    }
    let cowoncyerrortime = 0;
    if (msg.includes("You don't have enough cowoncy!")) {
      if (cowoncyerrortime === 0) {
        cowoncyerrortime = Date.now();
      }
      const now = Date.now();
      if (config.autosell) {
        if (now - cowoncyerrortime > 60000) {
          cowoncyerrortime = now;
          (0, gamble_js_1.sell)(client_js_1.client);
        } else if (now - cowoncyerrortime < 60000) {
          logger_js_1.default.warn(`You don't have enough cowoncy!`);
          logger_js_1.default.warn(`Stopping the bot...`);
          process.exit();
        }
      } else {
        logger_js_1.default.warn(`You don't have enough cowoncy!`);
        logger_js_1.default.warn(`Stopping the bot...`);
      }
    }
  }
}
