const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
module.exports = {
    name: "random",
    aliases: ["rand"],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        try {
    let data = await database.ref(`Number`).once('value')
    data = data.val()

    if(!data) return message.channel.send("Posts are empty")
    let number = data.id
    if(!number) return message.channel.send("Posts are empty")
    let result = undefined;

    do {
        let random = Math.floor(Math.random() * (number - 100)) + 100
        console.log(random)
        result = await database.ref(`Posts/${random}`).once('value')
        result = result.val()
    } while (!result || !result.url)

    const embed = new Discord.MessageEmbed()
    .setImage(result.url)
    .setFooter(`Post by ${result.user ? result.user : 'unknown'}`)

    return message.channel.send(embed)
} catch (err) { console.log(err) }
}}