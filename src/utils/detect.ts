import { client } from "../structures/client";
import info from "../structures/info";
import logger from "../utils/logger";

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

export default async function detect(message: any) {
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

      if (
        message.components.length > 0 &&
        message.components[0].components[0]
      ) {
        let check1 = message.components[0].components.find(
          (button: any) => button.url.toLowerCase() === "owobot.com",
        );
        let check2 = message.components[0].components[0].url
          .toLowerCase()
          .includes("owobot.com");

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
  }
}
