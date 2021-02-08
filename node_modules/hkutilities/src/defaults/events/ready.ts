import { Client } from "discord.js";
import HKandler from "../../structures/hkandler";

export = (bot: Client, hkandler: HKandler) => {
    console.log(`Logged in as ${bot.user!.tag}`);
    setInterval(function () {
      bot.user!.setActivity(
        `${bot.guilds.cache.size} servers! | ${hkandler.prefix}help`,
        { type: "WATCHING" }
      );
    }, 20000);
}