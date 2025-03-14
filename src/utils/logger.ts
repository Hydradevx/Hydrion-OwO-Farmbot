import colors from "ansi-colors";
import fs from "fs";
import path from "path";

interface LogFunction {
  (message: string): void;
}

let logs: string[] = [];
const maxLogs = process.stdout.rows - 10;

const PackagePath = path.join(__dirname, "../../package.json");
const Json = JSON.parse(fs.readFileSync(PackagePath, "utf8"));

const log: LogFunction = (message: string) => {
  logs.push(message);
  console.log(message);
  renderLogs();
};

function displayTextArt(): void {
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

function renderLogs(): void {
  displayTextArt();
  console.log(colors.green("\nLogs:\n"));

  const logsToShow = logs.slice(-maxLogs);

  logsToShow.forEach((logText) => {
    console.log(logText);
  });
}

function initLogger(): void {
  log(colors.green("Logger initialized."));
}

function status(message: string) {
  log(colors.cyan(`[STATUS] ${message}`));
}

function warn(message: string) {
  log(colors.red(`[WARN] ${message}`));
}

function info(message: string) {
  log(colors.blue(`[INFO] ${message}`));
}

function error(message: string) {
  log(colors.red(`[ERROR] ${message}`));
}

function hunt(message: string) {
  log(colors.green(`[HUNT] ${message}`));
}

function battle(message: string) {
  log(colors.yellow(`[BATTLE] ${message}`));
}

function gamble(message: string) {
  log(colors.cyan(`[GAMBLE] ${message}`));
}

function cmd(message: string) {
  log(colors.cyan(`[COMMAND] ${message}`));
}

function gem(message: string) {
  log(colors.cyan(`[GEM] ${message}`));
}

function luck(message: string) {
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
