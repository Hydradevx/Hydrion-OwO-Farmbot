import colors from "ansi-colors";
import fs from "fs";
import path from "path";
let logs = [];
const maxLogs = process.stdout.rows - 10;
const configPath = path.join(__dirname, "..", "..", "config.json");
const Json = JSON.parse(fs.readFileSync(configPath, "utf8"));
const log = (message) => {
  logs.push(message);
  console.log(message);
  renderLogs();
};
function displayTextArt() {
  const textArt = `
    ${colors.cyanBright("██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗")}
    ${colors.cyanBright("██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║")}
    ${colors.cyanBright("███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║")}
    ${colors.cyanBright("██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║")}
    ${colors.cyanBright("██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║")}
    ${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝`)}
    ${colors.cyanBright(`OwO FarmBot v${Json.version}`)}
    `;
  console.clear();
  console.log(textArt);
}
function renderLogs() {
  displayTextArt();
  console.log(colors.green("\nLogs:\n"));
  const logsToShow = logs.slice(-maxLogs);
  logsToShow.forEach((logText) => {
    console.log(logText);
  });
}
function initLogger() {
  log(colors.green("Logger initialized."));
}
function status(message) {
  log(colors.cyan(`[STATUS] ${message}`));
}
function warn(message) {
  log(colors.red(`[WARN] ${message}`));
}
function info(message) {
  log(colors.blue(`[INFO] ${message}`));
}
function error(message) {
  log(colors.red(`[ERROR] ${message}`));
}
function hunt(message) {
  log(colors.green(`[HUNT] ${message}`));
}
function battle(message) {
  log(colors.yellow(`[BATTLE] ${message}`));
}
function gamble(message) {
  log(colors.cyan(`[GAMBLE] ${message}`));
}
function cmd(message) {
  log(colors.cyan(`[COMMAND] ${message}`));
}
function gem(message) {
  log(colors.cyan(`[GEM] ${message}`));
}
function luck(message) {
  log(colors.yellowBright(`[LUCK] ${message}`));
}
export default {
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
