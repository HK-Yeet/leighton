const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
const schema = require('../schemas/posts')
module.exports = {
    name: "random",
    description: 'Get a random tweet!',
    category: 'Social Media 2',
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

    let name;
    if(result.user) {

        let results = await schema.findOne({_id: result.user})
        if(!results) return message.channel.send(`Oops, something went wrong!`)
        
        name = results.name

    } else name = 'unknown'

    const embed = new Discord.MessageEmbed()
    .setImage(result.url)
    .setFooter(`Post by @${name}`)
    .setColor('RANDOM')

    return message.channel.send(embed)
} catch (err) { console.log(err) }
}}
