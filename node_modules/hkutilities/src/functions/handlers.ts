import { Client } from "discord.js";
import { existsSync, readdirSync, lstatSync } from "fs";
import { join } from "path";
import { checkEvent, checkProperties } from "./validate";
import HKandler from "../structures/hkandler";

let loadedEvents: string[] = [];

function loadStuff(
  bot: Client,
  commandsDir: any,
  eventsDir: any,
  featuresDir: any,
  hkandler: HKandler
) {
  commandHandler(bot, commandsDir, hkandler);
  eventHandler(bot, eventsDir, hkandler);
  featureHandler(bot, featuresDir, hkandler);
  loadDefaults(bot, hkandler);
}

function loadDefaults(bot: Client, hkandler: HKandler) {
  loadDefaultCommands(bot, hkandler);
  loadDefaultEvents(bot, hkandler);
}

function commandHandler(bot: Client, dir: any, hkandler: HKandler) {
  if (!existsSync(dir))
    return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
  const files = readdirSync(dir);
  for (const file of files) {
    const stat = lstatSync(join(dir, file));
    if (stat.isDirectory()) {
      commandHandler(bot, join(dir, file), hkandler);
    } else {
      if (file.endsWith(".js")) {
        const fileName = file.split(".")[0];
        const command = require(join(dir, file));
        const commandName = command.name;
        if (checkProperties(fileName, command)) {
          hkandler.commands.set(command.name, command);
          console.log(`HKUtilities ❯ Loading command ❯ ${commandName}`);
        }
      }
    }
  }
}

function eventHandler(bot: Client, dir: any, hkandler: HKandler) {
  if (!existsSync(dir))
    return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
  const files = readdirSync(dir);
  for (const file of files) {
    const stat = lstatSync(join(dir, file));
    if (stat.isDirectory()) {
      eventHandler(bot, join(dir, file), hkandler);
    } else {
      if (file.endsWith(".js")) {
        const event = require(join(dir, file));
        const eventName = file.split(".")[0];
        if (checkEvent(eventName)) {
          bot.on(eventName, event.bind(null, bot, hkandler));
          console.log(`HKUtilities ❯ Loading event ❯ ${eventName}`);
          loadedEvents.push(eventName);
        }
      }
    }
  }
}

function featureHandler(bot: Client, dir: any, hkandler: HKandler) {
  if (!existsSync(dir))
    return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
  const files = readdirSync(dir);
  for (const file of files) {
    const stat = lstatSync(join(dir, file));
    if (stat.isDirectory()) {
      featureHandler(bot, join(dir, file), hkandler);
    } else {
      if (file.endsWith(".js")) {
        const feature = require(join(dir, file));
        const featureName = file.split(".")[0];
        console.log(`HKUtilities ❯ Loading feature ❯ ${featureName}`);
        feature(bot, hkandler);
      }
    }
  }
}

function loadDefaultCommands(bot: Client, hkandler: HKandler) {
  const dir = join(__dirname, "..", "defaults", "commands");
  const files = readdirSync(dir);
  for (const file of files) {
    const command = require(join(dir, file));
    const commandName = command.name;
    if (
      hkandler.commands.get(commandName) ||
      hkandler.commands.find(
        (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
      )
    )
      continue;
    console.log(`HKUtilities ❯ Loading default command ❯ ${commandName}`);
    hkandler.commands.set(command.name, command);
  }
}

function loadDefaultEvents(bot: Client, hkandler: HKandler) {
  const dir = join(__dirname, "..", "defaults", "events");
  const files = readdirSync(dir);
  for (const file of files) {
    const event = require(join(dir, file));
    const eventName = file.split(".")[0];
    if (!loadedEvents.includes(eventName)) {
      bot.on(eventName, event.bind(null, bot, hkandler));
      console.log(`HKUtilities ❯ Loading default event ❯ ${eventName}`);
    }
  }
}

export = loadStuff;
