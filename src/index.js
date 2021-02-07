const { HKandler } = require("hkutilities");
const { Client } = require("discord.js");
const { prefix, token, owners } = require("./config.json");
const client = new Client(); 

let dirs = {
  commandsDir: "commands",
  eventsDir: "events",
  featuresDir: "features",
};

new HKandler(client, dirs)
  .setPrefix(prefix)
  .setOwners(owners)
  .setDefaultCooldown(3) //5 is default
  .setHelpDescription("Imagine needing help lmao");

client.login(token);
