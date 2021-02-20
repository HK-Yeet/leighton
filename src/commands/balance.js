const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
module.exports = {
    name: "balance",
    aliases: ["bal"],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
    data = data.val()

    if(!data) return channel.send("You don't have an account created")

    return message.channel.send(`You have ${coin} **${data.money || 0}**`)
}}