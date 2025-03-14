"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = update;
const axios = require("axios");
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const inquirer_1 = __importDefault(require("inquirer"));
const { spawn } = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function update() {
  try {
    const rawFileUrl =
      "https://raw.githubusercontent.com/Hydradevx/Hydrion-OwO-Farmbot/refs/heads/main/package.json";
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };
    const response = await axios.get(rawFileUrl, { headers });
    if (!response.data || !response.data.version) {
      logger_js_1.default.warn(
        "Failed to fetch latest version. Response is invalid.",
      );
      return;
    }
    const ghVersion = response.data.version;
    const packageJsonPath = path_1.default.join(
      __dirname,
      "../../package.json",
    );
    const packageJsonContent = fs_1.default.readFileSync(
      packageJsonPath,
      "utf-8",
    );
    const Json = JSON.parse(packageJsonContent);
    const version = Json.version;
    if (ghVersion > version) {
      logger_js_1.default.status(`New version available: ${ghVersion}`);
      logger_js_1.default.warn(
        "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
      );
      const { update } = await inquirer_1.default.prompt([
        {
          type: "confirm",
          name: "update",
          message: `Do you want to update now? ( v${version} -> v${ghVersion})`,
        },
      ]);
      if (update) {
        logger_js_1.default.info("Updating...");
        const git = spawn("git", ["pull"], { stdio: "inherit" });
        git.on("close", (code) => {
          if (code === 0) {
            logger_js_1.default.info("Update successful!");
          } else {
            logger_js_1.default.warn("Update failed!");
          }
        });
      }
    } else {
      logger_js_1.default.info(
        `You are running the latest version: ${version}`,
      );
    }
  } catch (error) {
    logger_js_1.default.warn(`Error checking for updates: ${error.message}`);
  }
}
