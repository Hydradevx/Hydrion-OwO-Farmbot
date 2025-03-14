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
async function execute(client) {
  const configPath = path_1.default.join(__dirname, "../../config.json");
  const config = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
  if (!config.battle) return;
  const constsPath = path_1.default.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs_1.default.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info_js_1.default.getPaused() && !info_js_1.default.getCaptcha()) {
        channel.send("owo battle");
        logger_js_1.default.battle(`Battle Command Executed`);
      }
    }, consts.battleInterval);
  }
}
module.exports = {
  execute,
};
