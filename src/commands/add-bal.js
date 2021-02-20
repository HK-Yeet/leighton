const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
module.exports = {
    name: "add-bal",
    aliases: ["addbal"],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
    data = data.val()

    if(!data) return channel.send("You don't have an account created")
    let cash = data.money || 0

    await database.ref(`Profiles/${message.author.id}`).update({money: cash + parseInt(args[0])})

    return message.channel.send(`Added ${coin} ${parseInt(args[0])} coins to ${message.author} balance`)
}}