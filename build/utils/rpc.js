import { RichPresence } from "discord.js-selfbot-v13";
import logger from "./logger.js";
export function rpc(client) {
  if (!client || !client.user) {
    console.error("Client is not initialized or logged in.");
    return;
  }
  const status = new RichPresence(client)
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
  logger.status("Started Hydrion OwO Farmer Discord RPC");
}
