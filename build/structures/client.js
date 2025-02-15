"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.cl_start = cl_start;
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const logger_1 = __importDefault(require("../utils/logger"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let configPath = path.join(__dirname, "../../config.json");
let config;
if (fs.existsSync(configPath)) {
  const configFile = fs.readFileSync(configPath, "utf-8");
  config = JSON.parse(configFile);
} else {
  logger_1.default.error("Config file not found!");
  process.exit();
}
exports.client = new discord_js_selfbot_v13_1.Client();
exports.client.on("ready", async () => {
  if (exports.client.user) {
    logger_1.default.status(`Logged in as ${exports.client.user.tag}`);
  }
});
function cl_start() {
  exports.client.login(config.token);
}
exports.client.info = {
  paused: false,
};
