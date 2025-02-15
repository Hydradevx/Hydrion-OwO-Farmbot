import * as colors from "ansi-colors";

function status(message: string) {
  console.log(colors.blue(`[STATUS] ${message}`));
}

function warn(message: string) {
  console.log(colors.red(`[WARN] ${message}`));
}

function info(message: string) {
  console.log(colors.blue(`[INFO] ${message}`));
}

function error(message: string) {
  console.log(colors.red(`[ERROR] ${message}`));
}

function hunt(message: string) {
  console.log(colors.green(`[HUNT] ${message}`));
}

function battle(message: string) {
  console.log(colors.yellow(`[BATTLE] ${message}`));
}

function gamble(message: string) {
  console.log(colors.cyan(`[GAMBLE] ${message}`));
}

export default {
  status,
  error,
  hunt,
  battle,
  warn,
  info,
  gamble,
};
