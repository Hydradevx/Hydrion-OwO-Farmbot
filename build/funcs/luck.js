"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const info_js_1 = __importDefault(require("../structures/info.js"));
function getOption() {
  const options = ["pray", "curse"];
  return options[Math.floor(Math.random() * options.length)];
}
async function execute(client) {
  const configPath = path_1.default.join(__dirname, "../../config.json");
  const config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
  if (!config.luck) return;
  const constsPath = path_1.default.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs_1.default.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  const option = getOption();
  channel.send(`owo ${option} <@&408785106942164992>`);
  logger_js_1.default.luck(`Luck Command Executed with Option: ${option}`);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info_js_1.default.getPaused() && !info_js_1.default.getCaptcha()) {
        const option = getOption();
        channel.send(`owo ${option} <@&408785106942164992>`);
        logger_js_1.default.luck(
          `Luck Command Executed with Option: ${option}`,
        );
      }
    }, consts.luckInterval);
  }
}
module.exports = {
  execute,
};
