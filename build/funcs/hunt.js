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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const info_1 = __importDefault(require("../structures/info"));
const inventory_1 = require("./inventory");
async function execute(client) {
  const configPath = path.join(__dirname, "../../config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.hunt) return;
  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId);
  if (channel?.isText()) {
    setInterval(() => {
      if (!info_1.default.getPaused() && !info_1.default.getCaptcha()) {
        channel.send("owo hunt").then((message) => {
          const filter = (m) => m.content.includes("hunt");
          const collector = message.channel.createMessageCollector({
            filter,
            max: 1,
            time: 10000,
          });
          collector.on("collect", (m) => {
            (0, inventory_1.filtergem)(m);
            collector.stop();
          });
        });
        logger_1.default.hunt(`Hunt Command Executed`);
      }
    }, consts.huntInterval);
  }
}
module.exports = {
  execute,
};
