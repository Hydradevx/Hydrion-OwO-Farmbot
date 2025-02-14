"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const logger = require("../utils/logger");
const fs_1 = __importDefault(require("fs"));
let config = fs_1.default.readFileSync("../../config.json");
const client = new discord_js_selfbot_v13_1.Client();
client.on("ready", async () => {
    logger.status(`Logged in as ${client.user.tag}`);
});
client.login(config.token);
