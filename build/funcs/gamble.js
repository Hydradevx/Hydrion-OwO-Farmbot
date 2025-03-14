"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sell = sell;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const info_js_1 = __importDefault(require("../structures/info.js"));
const configPath = path_1.default.join(__dirname, "../../config.json");
const config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
const constsPath = path_1.default.join(__dirname, "../../consts.json");
const consts = JSON.parse(fs_1.default.readFileSync(constsPath, "utf-8"));
const channelId = consts.channelId;
async function execute(client) {
  const channel = client.channels.cache.get(channelId);
  if (!config.gamble) return;
  if (channel?.isText()) {
    setInterval(() => {
      if (!info_js_1.default.getPaused() && !info_js_1.default.getCaptcha()) {
        const method = getMethod();
        if (method === "slots") {
          channel.send(`owo slots ${consts.gamble.s_bet}`);
          logger_js_1.default.gamble(`Slots Command Executed`);
        } else {
          const side = getHeadsOrTails();
          channel.send(`owo coinflip ${side} ${consts.gamble.cf_bet}`);
          logger_js_1.default.gamble(
            `Coinflip Command Executed with Side: ${side}`,
          );
        }
      }
    }, consts.gambleInterval);
  }
}
function getMethod() {
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    return "slots";
  }
  return "coinflip";
}
function getHeadsOrTails() {
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    return "heads";
  }
  return "tails";
}
function sell(client) {
  const channel = client.channels.cache.get(channelId);
  channel.send("owo sell all");
}
module.exports = {
  execute,
};
