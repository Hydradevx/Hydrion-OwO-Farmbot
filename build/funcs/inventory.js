"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtergem = filtergem;
const logger_1 = __importDefault(require("../utils/logger"));
async function filtergem(m) {
  if (!gem1.some((gem) => m.content.includes(gem))) {
    logger_1.default.hunt("gem not found");
  } else {
    logger_1.default.hunt("gem found");
  }
}
let gem1 = [
  "<:cgem1:492572122120585240>",
  "rgem1",
  "ugem1",
  "egem1",
  "lgem1",
  "mgem1",
  "fgem1",
];
async function equip() {}
