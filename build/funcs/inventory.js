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
exports.filtergem = filtergem;
const logger_1 = __importDefault(require("../utils/logger"));
const client_1 = require("../structures/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let gem_1 = true;
let gem_3 = true;
let gem_4 = true;
let star_ = true;
async function filtergem(m) {
  let g1 = true;
  let g3 = true;
  let g4 = true;
  let s = true;
  if (!gem1.some((gem) => m.content.includes(gem)) && gem_1) {
    g1 = false;
  }
  if (!gem3.some((gem) => m.content.includes(gem)) && gem_3) {
    g3 = false;
  }
  if (!gem4.some((gem) => m.content.includes(gem)) && gem_4) {
    g4 = false;
  }
  if (!star.some((gem) => m.content.includes(gem)) && star_) {
    s = false;
  }
  equip(g1, g3, g4, s);
}
let gem1 = [
  "<:cgem1:492572122120585240>",
  "<:ugem1:492572122514980864>",
  "<:rgem1:492572122888011776>",
  "<:egem1:492572122477101056>",
  "<:mgem1:492572122590478356>",
  "<a:lgem1:492572124251422720>",
  "<a:fgem1:492572124070936586>",
];
let gem3 = [
  "<:cgem3:510366792024195072>",
  "<:ugem3:510366792095367189>",
  "<:rgem3:510366792653340674>",
  "<:egem3:510366792800272394>",
  "<:mgem3:510366792447819777>",
  "<a:lgem3:510366794729652224>",
  "<a:fgem3:510366794792566785>",
];
let gem4 = [
  "<:ugem4:510366764249382922>",
  "<:rgem4:510366763884478464>",
  "<:egem4:510366763972558848>",
  "<:mgem4:510366763993661440>",
  "<a:lgem4:510366765826572295>",
  "<a:fgem4:510366765340033025>",
];
let star = [
  "<:cstar:1101731000721096744>",
  "<:ustar:1101731011236220998>",
  "<:rstar:1101731009684328479>",
  "<:estar:1101731002021330974>",
  "<:mstar:1101731007918526524>",
  "<a:lstar:1101731005473230880>",
  "<a:fstar:1101735557001908274>",
];
async function equip(g1, g3, g4, s) {
  const configPath = path.join(__dirname, "../../config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (!config.inventory) return;
  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client_1.client.channels.cache.get(channelId);
  channel.send("owo inv").then(async (inv_msg) => {
    const id = inv_msg.id;
    const message = await getMessage(id);
    async function getMessage(messageId) {
      return new Promise((resolve) => {
        const filter = (msg) =>
          msg.content.includes("Inventory =") &&
          msg.author.id === "408785106942164992" &&
          msg.channel.id === channel.id &&
          msg.id.localeCompare(messageId) > 0;
        const listener = (msg) => {
          if (filter(msg)) {
            clearTimeout(timer);
            client_1.client.off("messageCreate", listener);
            resolve(msg);
          }
        };
        const timer = setTimeout(() => {
          client_1.client.off("messageCreate", listener);
          resolve(null);
        }, 6100);
        client_1.client.on("messageCreate", listener);
        const collector = channel.createMessageCollector({
          filter,
          time: 6100,
        });
        collector.on("collect", (msg) => {
          if (filter(msg)) {
            collector.stop();
            resolve(msg);
          }
        });
        collector.on("end", () => resolve(null));
      });
    }
    let inventory = message.content;
    if (inventory === null) {
      equip(g1, g3, g4, s);
      return;
    }
    let gems = [];
    let regex = /`([^`]+)`/g;
    let match;
    while ((match = regex.exec(inventory)) !== null) {
      gems.push(match[1]);
    }
    await new Promise((resolve) => setTimeout(resolve, 12000));
    if (gems.includes("50")) {
      channel.send("owo lb all");
      logger_1.default.gem("Opening loot boxes");
      equip(g1, g3, g4, s);
      return;
    }
    if (gems.includes("100")) {
      channel.send("owo crate all");
      logger_1.default.gem("Opening Crates");
      equip(g1, g3, g4, s);
      return;
    }
    let gem__1 = "0";
    let gem__3 = "0";
    let gem__4 = "0";
    let star__ = "0";
    if (g1) {
      const gem1Range = gems.filter(
        (gem) => parseInt(gem) >= 51 && parseInt(gem) <= 57,
      );
      if (gem1Range.length > 0) {
        gem__1 = config.lowest
          ? Math.min(...gem1Range.map(Number)).toString()
          : Math.max(...gem1Range.map(Number)).toString();
      }
    }
    if (g3) {
      const gem3Range = gems.filter(
        (gem) => parseInt(gem) >= 65 && parseInt(gem) <= 71,
      );
      if (gem3Range.length > 0) {
        gem__3 = config.lowest
          ? Math.min(...gem3Range.map(Number)).toString()
          : Math.max(...gem3Range.map(Number)).toString();
      }
    }
    if (g4) {
      const gem4Range = gems.filter(
        (gem) => parseInt(gem) >= 72 && parseInt(gem) <= 78,
      );
      if (gem4Range.length > 0) {
        gem__4 = config.lowest
          ? Math.min(...gem4Range.map(Number)).toString()
          : Math.max(...gem4Range.map(Number)).toString();
      }
    }
    if (s) {
      const starRange = gems.filter(
        (gem) => parseInt(gem) >= 79 && parseInt(gem) <= 85,
      );
      if (starRange.length > 0) {
        star__ = config.lowest
          ? Math.min(...starRange.map(Number)).toString()
          : Math.max(...starRange.map(Number)).toString();
      }
    }
    channel.send(`owo equip ${gem__1} ${gem__3} ${gem__4} ${star__}`);
    logger_1.default.gem(
      `Equipping Gems: ${gem__1} ${gem__3} ${gem__4} ${star__}`,
    );
  });
}
