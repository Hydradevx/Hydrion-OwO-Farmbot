const axios = require("axios");
import logger from "../utils/logger";
import inquirer from "inquirer";
const { spawn } = require("child_process");
import fs from "fs";
import path from "path";

export default async function update() {
  try {
    const rawFileUrl =
      "https://raw.githubusercontent.com/Hydradevx/Hydrion-S3LFB0T/refs/heads/main/package.json";

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537",
    };

    const response = await axios.get(rawFileUrl, { headers });

    if (!response.data || !response.data.version) {
      logger.warn("Failed to fetch latest version. Response is invalid.");
      return;
    }

    const ghVersion = response.data.version;
    const packageJsonPath = path.join(__dirname, "../../package.json");
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const Json = JSON.parse(packageJsonContent);

    const version = Json.version;

    if (ghVersion !== version) {
      logger.status(`New version available: ${ghVersion}`);
      logger.warn(
        "Please backup your config.json and install the latest version to continue using Hydrion!! Thank you",
      );

      const { update } = await inquirer.prompt([
        {
          type: "confirm",
          name: "update",
          message: "Do you want to update now?",
        },
      ]);

      if (update) {
        logger.info("Updating...");
        const git = spawn("git", ["pull"], { stdio: "inherit" });
        git.on("close", (code: any) => {
          if (code === 0) {
            logger.info("Update successful!");
          } else {
            logger.warn("Update failed!");
          }
        });
      }
    } else {
      logger.info(`You are running the latest version: ${version}`);
    }
  } catch (error: any) {
    logger.warn(`Error checking for updates: ${error.message}`);
  }
}
