"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const handlers_1 = __importDefault(require("../functions/handlers"));
class HKandler {
    constructor(bot, options) {
        this._commandsDir = "commands";
        this._eventsDir = "events";
        this._featuresDir = "features";
        this._prefix = "!";
        this._mentionPreix = false;
        this._defaultCooldown = 3;
        this._owners = [""];
        this._commands = new discord_js_1.Collection();
        this._helpDescription = null;
        if (!bot) {
            throw new Error("HKUtilities ❯ No Discord.JS Client provided ❯ Need further assistance? Join the discord https://hk-yeet.github.io/discord");
        }
        if (!options.commandsDir) {
            console.warn('HKUtilities ❯ No commands folder prvided, using "commands"');
        }
        if (!options.eventsDir) {
            console.warn('HKUtilities ❯ No events folder provided, using "events"');
        }
        if (!options.featuresDir) {
            console.warn('HKUtilities ❯ No features folder provided, using "features"');
        }
        if (module && require.main) {
            const { path } = require.main;
            if (path) {
                handlers_1.default(bot, path_1.join(path, options.commandsDir || this._commandsDir), path_1.join(path, options.eventsDir || this._eventsDir), path_1.join(path, options.featuresDir || this._featuresDir), this);
            }
        }
    }
    get commands() {
        return this._commands;
    }
    setOwners(owners) {
        this._owners = owners;
        return this;
    }
    get owners() {
        return this._owners;
    }
    setPrefix(prefix) {
        this._prefix = prefix;
        return this;
    }
    get prefix() {
        return this._prefix;
    }
    setMentionPrefix(mentionPrefix) {
        this._mentionPreix = mentionPrefix;
        return this;
    }
    get mentionPrefix() {
        return this._mentionPreix;
    }
    setDefaultCooldown(cooldown) {
        this._defaultCooldown = cooldown;
        return this;
    }
    get defaultCooldown() {
        return this._defaultCooldown;
    }
    setHelpDescription(helpDescription) {
        this._helpDescription = helpDescription;
        return this;
    }
    get helpDescription() {
        return this._helpDescription;
    }
}
module.exports = HKandler;
