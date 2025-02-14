"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
function execute(client) {
  const configPath = path_1.default.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel && channel.isText() && !client.info.paused) {
    setInterval(() => {
      channel.send("owo hunt");
      logger_1.default.hunt(`Hunt Command Executed`);
    }, consts.huntInterval);
  }
}
module.exports = {
  execute,
};
