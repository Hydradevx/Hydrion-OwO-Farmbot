import fs from "fs";
import path from "path";

import { Message, TextChannel } from "discord.js-selfbot-v13";

import logger from "../utils/logger.js";
import { client } from "../structures/client.js";

let gem_1 = true;
let gem_3 = true;
let gem_4 = true;
let star_ = true;

export async function filtergem(m: any) {
  let g1 = true;
  let g3 = true;
  let g4 = true;
  let s = true;
  if (!gem1.some((gem) => m.content.includes(gem)) && gem_1) { // if(!m.content.includes("gem1"))
    g1 = false;
  }
  if (!gem3.some((gem) => m.content.includes(gem)) && gem_3) { // same things
    g3 = false;
  }
  if (!gem4.some((gem) => m.content.includes(gem)) && gem_4) {
    g4 = false;
  }
  if (!star.some((gem) => m.content.includes(gem)) && star_) {
    s = false;
  }
  equip(g1, g3, g4, s);
}

let gem1 = [
  "<:cgem1:492572122120585240>",
  "<:ugem1:492572122514980864>",
  "<:rgem1:492572122888011776>",
  "<:egem1:492572122477101056>",
  "<:mgem1:492572122590478356>",
  "<a:lgem1:492572124251422720>",
  "<a:fgem1:492572124070936586>",
];

let gem3 = [
  "<:cgem3:510366792024195072>",
  "<:ugem3:510366792095367189>",
  "<:rgem3:510366792653340674>",
  "<:egem3:510366792800272394>",
  "<:mgem3:510366792447819777>",
  "<a:lgem3:510366794729652224>",
  "<a:fgem3:510366794792566785>",
];

let gem4 = [
  "<:ugem4:510366764249382922>",
  "<:rgem4:510366763884478464>",
  "<:egem4:510366763972558848>",
  "<:mgem4:510366763993661440>",
  "<a:lgem4:510366765826572295>",
  "<a:fgem4:510366765340033025>",
];

let star = [ // you just need to check if gem1/gem3/gem4/star is in the message, after hunt command is sent
  "<:cstar:1101731000721096744>",
  "<:ustar:1101731011236220998>",
  "<:rstar:1101731009684328479>",
  "<:estar:1101731002021330974>",
  "<:mstar:1101731007918526524>",
  "<a:lstar:1101731005473230880>",
  "<a:fstar:1101735557001908274>",
];

async function equip(g1: boolean, g3: boolean, g4: boolean, s: boolean) {
  const configPath = path.join(__dirname, "../../config.json"); // consider creating a typing.ts
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8")); // give this a type
  if (!config.inventory) return;

  const constsPath = path.join(__dirname, "../../consts.json");
  const consts = JSON.parse(fs.readFileSync(constsPath, "utf-8"));
  const channelId = consts.channelId;
  const channel = client.channels.cache.get(channelId) as TextChannel;

  // const inv_msg = channel.send("owo inv");
  // const id = inv_msg.id;
  channel.send("owo inv");

  logger.gem(`Checking your inventory`);

  const message = await new Promise<Message | undefined>((resolve) => {
    channel.createMessageCollector({
      filter: m => m.author.id === "408785106942164992" 
      && m.content.includes(m.guild?.members.me?.displayName!)
      && m.content.includes("Inventory"),
      time: 10000, max: 1
    }).once("collect", resolve)
    .once("end", col => {
      if (col.size === 0) resolve(undefined);
    });
  })

  // const message = await getMessage(id);

  // function getMessage(messageId: string): Promise<any> {
  //   return new Promise((resolve) => {
  //     const filter = (msg: Message) =>
  //       msg.author.id === "408785106942164992" &&
  //     msg.channel.id === channel.id &&
  //       msg.content.includes("Inventory") &&
  //       msg.id.localeCompare(messageId) > 0;

  //     const listener = (msg: Message) => {
  //       if (filter(msg)) {
  //         clearTimeout(timer);
  //         client.off("messageCreate", listener);
  //         resolve(msg);
  //       }
  //     };

  //     const timer = setTimeout(() => {
  //       client.off("messageCreate", listener);
  //       resolve(null);
  //     }, 6100);

  //     client.on("messageCreate", listener);

  //     const collector = channel.createMessageCollector({
  //       filter,
  //       time: 6100,
  //     });

  //     collector.on("collect", (msg: any) => {
  //       if (filter(msg)) {
  //         collector.stop();
  //         resolve(msg);
  //       }
  //     });

  //     collector.on("end", () => resolve(null));
  //   });
  // }
  let inventory = message?.content;

  if (!inventory) {
    equip(g1, g3, g4, s); // this can cause infinite loop
    return;
  }

  let gems = [];
  let regex = /`([^`]+)`/g;
  let match;
  while ((match = regex.exec(inventory)) !== null) { //while with regex is not recommended (heavy operation)
    gems.push(match[1]);
  }

  await new Promise((resolve) => setTimeout(resolve, 12000)); // try client.sleep (it works the same)

  if (gems.includes("50")) {
    channel.send("owo lb all");
    logger.gem("Opening loot boxes");
    equip(g1, g3, g4, s);
    return;
  }
  if (gems.includes("100")) {
    channel.send("owo crate all");
    logger.gem("Opening Crates");
    equip(g1, g3, g4, s);
    return;
  }

  let gem__1 = "0";
  let gem__3 = "0";
  let gem__4 = "0";
  let star__ = "0";

  const parseGemNumbers = (gemArray: string[], min: number, max: number) =>
    gemArray
      .map(Number)
      .filter((gem) => gem >= min && gem <= max)
      .map(String);

  if (g1) {
    const gem1Range = parseGemNumbers(gems, 51, 57);
    if (gem1Range.length) {
      gem__1 = config.lowest
        ? Math.min(...gem1Range.map(Number)).toString()
        : Math.max(...gem1Range.map(Number)).toString();
    }
  }

  if (g3) {
    const gem3Range = parseGemNumbers(gems, 65, 71);
    if (gem3Range.length) {
      gem__3 = config.lowest
        ? Math.min(...gem3Range.map(Number)).toString()
        : Math.max(...gem3Range.map(Number)).toString();
    }
  }

  if (g4) {
    const gem4Range = parseGemNumbers(gems, 72, 78);
    if (gem4Range.length) {
      gem__4 = config.lowest
        ? Math.min(...gem4Range.map(Number)).toString()
        : Math.max(...gem4Range.map(Number)).toString();
    }
  }

  if (s) {
    const starRange = parseGemNumbers(gems, 79, 85);
    if (starRange.length) {
      star__ = config.lowest
        ? Math.min(...starRange.map(Number)).toString()
        : Math.max(...starRange.map(Number)).toString();
    }
  }

  channel.send(`owo equip ${gem__1} ${gem__3} ${gem__4} ${star__}`);
  logger.gem(`Equipping Gems: ${gem__1} ${gem__3} ${gem__4} ${star__}`);
}
