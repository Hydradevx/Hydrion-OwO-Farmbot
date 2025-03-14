"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpc = rpc;
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const logger_js_1 = __importDefault(require("./logger.js"));
function rpc(client) {
  if (!client || !client.user) {
    console.error("Client is not initialized or logged in.");
    return;
  }
  const status = new discord_js_selfbot_v13_1.RichPresence(client)
    .setApplicationId("1340347268309586060")
    .setType("PLAYING")
    .setName("Hydrion OwO Farmer")
    .setDetails("Farming Owo Coins 🐾")
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage("owo")
    .setAssetsLargeText("Hydrion OwO Farmer 🐾")
    .addButton(
      "Join the Farm! 🌾",
      "https://github.com/Hydradevx/Hydrion-OwO-Farmer",
    )
    .addButton("Discord 💬", "https://discord.gg/6Tufbvnebj");
  client.user.setActivity(status);
  logger_js_1.default.status("Started Hydrion OwO Farmer Discord RPC");
}
