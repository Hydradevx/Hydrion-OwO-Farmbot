import logger from "../utils/logger.js";
import info from "../structures/info.js";

module.exports = {
  name: "stats",
  aliases: ["s"],
  execute(message: any, prefix: string) {
    const stats = `
> 📊 **Statistics**
> 
> 🔄 **Paused:** ${info.paused ? "Yes" : "No"}
> 🧩 **Captcha Required:** ${info.captcha ? "Yes" : "No"}
> 🔢 **Total Captchas Solved:** ${info.totalcaptcha}
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;

    message.channel.send(stats);

    logger.cmd("Stats Command has been executed");

    if (message.author.id === message.client.user.id) {
      message.delete().catch(() => {});
    }
  },
};
