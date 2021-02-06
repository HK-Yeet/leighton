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
  .setHelpDescription("Imagine needing help lmao");

client.login(token);
