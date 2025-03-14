"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.cl_start = cl_start;
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rpc_js_1 = require("../utils/rpc.js");
let configPath = path_1.default.join(__dirname, "../../config.json");
let config;
if (fs_1.default.existsSync(configPath)) {
  const configFile = fs_1.default.readFileSync(configPath, "utf-8");
  config = JSON.parse(configFile);
} else {
  logger_js_1.default.error("Config file not found!");
  process.exit();
}
exports.client = new discord_js_selfbot_v13_1.Client();
exports.client.on("ready", async () => {
  if (exports.client.user) {
    logger_js_1.default.status(`Logged in as ${exports.client.user.tag}`);
    (0, rpc_js_1.rpc)(exports.client);
  }
});
function cl_start() {
  exports.client.login(config.token);
}
