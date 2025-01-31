const detectCaptcha = (msg, check1, check2) => {
  const captchawords = [".com", "link", "please use the link"];
  return captchawords.some((word) => msg.includes(word)) && !check1 && !check2;
}

const removeInvis = (input) => {
  const invisibleChar = /[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g;
  return input.replace(invisibleChar, "");
};

module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.id !== "408785106942164992") return; // Only process OwO bot messages
        let msg = removeInvis(message.content.toLowerCase());
        let check1 = false;
        let check2 = false;
        if (message.components?.length > 0 && message.components[0].components?.length > 0) {
          check1 = message.components[0].components.some( (button) => button.url && button.url.toLowerCase() === "owobot.com");
          check2 = message.components[0].components.some( (button) => button.url && button.url.toLowerCase().includes("owobot.com") );
        }
        if ( msg.includes("captcha") ||
        msg.includes("please complete your captcha") ||
        msg.includes("please use the link") ||
        msg.includes("please use the link below so i can check") ||
        msg.includes("are you a real human") ||
        msg.includes("verify that you are human") ||
        detectCaptcha(msg, check1, check2)) {
          console.log("Captcha detected");
          client.info.captcha = true;
        }

        if (msg.includes("i have verified that you are human")) {
          client.info.captcha = false;
        }
  });
};