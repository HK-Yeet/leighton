"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const validate_1 = require("./validate");
let loadedEvents = [];
function loadStuff(bot, commandsDir, eventsDir, featuresDir, hkandler) {
    commandHandler(bot, commandsDir, hkandler);
    eventHandler(bot, eventsDir, hkandler);
    featureHandler(bot, featuresDir, hkandler);
    loadDefaults(bot, hkandler);
}
function loadDefaults(bot, hkandler) {
    loadDefaultCommands(bot, hkandler);
    loadDefaultEvents(bot, hkandler);
}
function commandHandler(bot, dir, hkandler) {
    if (!fs_1.existsSync(dir))
        return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
    const files = fs_1.readdirSync(dir);
    for (const file of files) {
        const stat = fs_1.lstatSync(path_1.join(dir, file));
        if (stat.isDirectory()) {
            commandHandler(bot, path_1.join(dir, file), hkandler);
        }
        else {
            if (file.endsWith(".js")) {
                const fileName = file.split(".")[0];
                const command = require(path_1.join(dir, file));
                const commandName = command.name;
                if (validate_1.checkProperties(fileName, command)) {
                    hkandler.commands.set(command.name, command);
                    console.log(`HKUtilities ❯ Loading command ❯ ${commandName}`);
                }
            }
        }
    }
}
function eventHandler(bot, dir, hkandler) {
    if (!fs_1.existsSync(dir))
        return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
    const files = fs_1.readdirSync(dir);
    for (const file of files) {
        const stat = fs_1.lstatSync(path_1.join(dir, file));
        if (stat.isDirectory()) {
            eventHandler(bot, path_1.join(dir, file), hkandler);
        }
        else {
            if (file.endsWith(".js")) {
                const event = require(path_1.join(dir, file));
                const eventName = file.split(".")[0];
                if (validate_1.checkEvent(eventName)) {
                    bot.on(eventName, event.bind(null, bot, hkandler));
                    console.log(`HKUtilities ❯ Loading event ❯ ${eventName}`);
                    loadedEvents.push(eventName);
                }
            }
        }
    }
}
function featureHandler(bot, dir, hkandler) {
    if (!fs_1.existsSync(dir))
        return console.warn(`HKUtilities ❯ ${dir} is not a directory`);
    const files = fs_1.readdirSync(dir);
    for (const file of files) {
        const stat = fs_1.lstatSync(path_1.join(dir, file));
        if (stat.isDirectory()) {
            featureHandler(bot, path_1.join(dir, file), hkandler);
        }
        else {
            if (file.endsWith(".js")) {
                const feature = require(path_1.join(dir, file));
                const featureName = file.split(".")[0];
                console.log(`HKUtilities ❯ Loading feature ❯ ${featureName}`);
                feature(bot, hkandler);
            }
        }
    }
}
function loadDefaultCommands(bot, hkandler) {
    const dir = path_1.join(__dirname, "..", "defaults", "commands");
    const files = fs_1.readdirSync(dir);
    for (const file of files) {
        const command = require(path_1.join(dir, file));
        const commandName = command.name;
        if (hkandler.commands.get(commandName) ||
            hkandler.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)))
            return;
        console.log(`HKUtilities ❯ Loading default command ❯ ${commandName}`);
        hkandler.commands.set(command.name, command);
    }
}
function loadDefaultEvents(bot, hkandler) {
    const dir = path_1.join(__dirname, "..", "defaults", "events");
    const files = fs_1.readdirSync(dir);
    for (const file of files) {
        const event = require(path_1.join(dir, file));
        const eventName = file.split(".")[0];
        if (!loadedEvents.includes(eventName)) {
            bot.on(eventName, event.bind(null, bot, hkandler));
            console.log(`HKUtilities ❯ Loading default event ❯ ${eventName}`);
        }
    }
}
module.exports = loadStuff;
