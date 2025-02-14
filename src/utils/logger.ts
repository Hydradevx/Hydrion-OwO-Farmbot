import * as colors from "ansi-colors";

function status(message: string) {
  console.log(colors.blue(`[STATUS] ${message}`));
}

function error(message: string) {
  console.log(colors.red(`[ERROR] ${message}`));
}

function hunt(message: string) {
  console.log(colors.green(`[HUNT] ${message}`));
}

export default {
  status,
  error,
  hunt,
};
