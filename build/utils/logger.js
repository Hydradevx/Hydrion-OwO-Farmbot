"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let logs = [];
const maxLogs = process.stdout.rows - 10;
const PackagePath = path_1.default.join(__dirname, "../../package.json");
const Json = JSON.parse(fs_1.default.readFileSync(PackagePath, "utf8"));
const log = (message) => {
  logs.push(message);
  console.log(message);
  renderLogs();
};
function displayTextArt() {
  const textArt = `
    ${ansi_colors_1.default.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${ansi_colors_1.default.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${ansi_colors_1.default.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${ansi_colors_1.default.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${ansi_colors_1.default.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${ansi_colors_1.default.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝`)}
    ${ansi_colors_1.default.cyanBright(`OwO FarmBot v${Json.version}`)}
    `;
  console.clear();
  console.log(textArt);
}
function renderLogs() {
  displayTextArt();
  console.log(ansi_colors_1.default.green("\nLogs:\n"));
  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((logText) => {
    console.log(logText);
  });
}
function initLogger() {
  log(ansi_colors_1.default.green("Logger initialized."));
}
function status(message) {
  log(ansi_colors_1.default.cyan(`[STATUS] ${message}`));
}
function warn(message) {
  log(ansi_colors_1.default.red(`[WARN] ${message}`));
}
function info(message) {
  log(ansi_colors_1.default.blue(`[INFO] ${message}`));
}
function error(message) {
  log(ansi_colors_1.default.red(`[ERROR] ${message}`));
}
function hunt(message) {
  log(ansi_colors_1.default.green(`[HUNT] ${message}`));
}
function battle(message) {
  log(ansi_colors_1.default.yellow(`[BATTLE] ${message}`));
}
function gamble(message) {
  log(ansi_colors_1.default.cyan(`[GAMBLE] ${message}`));
}
function cmd(message) {
  log(ansi_colors_1.default.cyan(`[COMMAND] ${message}`));
}
function gem(message) {
  log(ansi_colors_1.default.cyan(`[GEM] ${message}`));
}
function luck(message) {
  log(ansi_colors_1.default.yellowBright(`[LUCK] ${message}`));
}
exports.default = {
  status,
  error,
  hunt,
  battle,
  warn,
  info,
  gamble,
  cmd,
  initLogger,
  gem,
  luck,
};
