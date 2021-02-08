"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successEmbed = exports.errorEmbed = exports.quickEmbed = exports.filter = void 0;
const discord_js_1 = require("discord.js");
function filter(message) {
    if (message.author.bot) {
        return true;
    }
    else if (!message.guild) {
        return true;
    }
    else {
        return false;
    }
}
exports.filter = filter;
function quickEmbed(channel, content) {
    let embed = new discord_js_1.MessageEmbed().setColor("BLUE").setDescription(`${content}`);
    if (!channel.guild &&
        !channel
            .permissionsFor(channel.guild.me)
            .has(["SEND_MESSAGES", "EMBED_LINKS"]))
        return;
    return channel.send(embed);
}
exports.quickEmbed = quickEmbed;
function successEmbed(channel, content) {
    if (!channel.guild &&
        !channel
            .permissionsFor(channel.guild.me)
            .has(["SEND_MESSAGES", "EMBED_LINKS"]))
        return;
    let embed = new discord_js_1.MessageEmbed()
        .setColor("GREEN")
        .setTitle("✅・ Success")
        .setDescription(`${content}`);
    return channel.send(embed);
}
exports.successEmbed = successEmbed;
function errorEmbed(channel, content) {
    if (!channel.guild &&
        !channel
            .permissionsFor(channel.guild.me)
            .has(["SEND_MESSAGES", "EMBED_LINKS"]))
        return;
    let embed = new discord_js_1.MessageEmbed()
        .setColor("RED")
        .setTitle("❌・ Error")
        .setDescription(`${content}`);
    return channel.send(embed);
}
exports.errorEmbed = errorEmbed;
