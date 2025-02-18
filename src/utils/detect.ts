import fs from "fs";
import path from "path";

import { Message } from "discord.js-selfbot-v13";

import { client } from "../structures/client.js";
import info from "../structures/info.js";
import logger from "../utils/logger.js";
import { sell } from "../funcs/gamble.js";


const configPath = path.join(__dirname, "../../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const detectCaptcha = (msg: string, check1: boolean, check2: boolean) => {
  const captchawords = [".com", "link", "please use the link"];
  const iscaptcha = captchawords.some((word) => msg.includes(word));
  if (iscaptcha && !check1 && !check2) {
    return true;
  }
};

const removeInvis = (input: string) => {
  const invisibleChar = /[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g;
  return input.replace(invisibleChar, "");
};

export default async function detect(message: Message) {
  if (
    message.author.id === "408785106942164992" &&
    message.channel.id === client.config.channel
  ) {
    let msg = removeInvis(message.content.toLowerCase());

    if (
      (msg.includes("captcha") ||
        msg.includes("please complete your captcha") ||
        msg.includes("please use the link") ||
        msg.includes("please use the link below so i can check") ||
        msg.includes("are you a real human") ||
        msg.includes("verify that you are human")) &&
      !info.captcha
    ) {
      info.setCaptcha(true);
      info.increaseCaptcha();
      logger.status("captcha detected");

      if (
        message.components.length > 0 &&
        message.components[0].components[0]
      ) {
        const component = message.components[0].components[0];
        if(component.type !== "BUTTON") return;

        let check1 = message.content.includes("owobot.com");
        let check2 = component.url
          ?.toLowerCase()
          ?.includes("owobot.com") ?? false;

        if (detectCaptcha(msg, check1, check2) === true) {
          logger.status("captcha detected");
          info.setCaptcha(true);
          info.increaseCaptcha();
        }
      }
    }

    if (msg.includes("i have verified that you are human")) {
      info.setCaptcha(false);
    }

    let cowoncyerrortime: any = 0;
    if (msg.includes("You don't have enough cowoncy!")) {
      if (cowoncyerrortime === 0) {
        cowoncyerrortime = Date.now();
      }
      const now = Date.now();
      if (config.autosell) {
        if (now - cowoncyerrortime > 60000) {
          cowoncyerrortime = now;
          sell(client);
        } else if (now - cowoncyerrortime < 60000) {
          logger.warn(`You don't have enough cowoncy!`);
          logger.warn(`Stopping the bot...`);
          process.exit();
        }
      } else {
        logger.warn(`You don't have enough cowoncy!`);
        logger.warn(`Stopping the bot...`);
      }
    }
  }
}
