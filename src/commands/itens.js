const Discord = require('discord.js')
const schema = require('../schemas/items')


module.exports = {
    name: "games",
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
    data = data.val()

    if(!data) return channel.send("You don't have an account created")

const results = await schema.findOne({_id: message.author.id})
if(!results) return message.channel.send('You don\'t have any games')
if(!results.itens) return message.channel.send('You don\'t have any games')
if(results.itens.length <= 0) return message.channel.send('You don\'t have any games')
let description = '**GAMES:**\n'
results.itens.forEach(id => description += '`' + id + '`\n')
const embed = new Discord.MessageEmbed()
.setDescription(description)
.setColor('RANDOM')

return message.channel.send(embed)
}}