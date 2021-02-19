const Discord = require('discord.js')
const emojis = require('../objects/emojis.json')

module.exports = {
    name: "shop",
    category: 'Economy',
    aliases: ['store', 'games'],
    description: 'Game Shop!',
    clientPerms: ['SEND_MESSAGES'],
    cooldown: 20,
    callback: async (client, message, args, handler) => {
        const rm = require('discord.js-reaction-menu')
        const description = 'Welcome to the game shop!\nBuy Games here to increase the follower revenue per video!'
        const page1 = new Discord.MessageEmbed()
            .setTitle('Page 1')
            .setDescription(description)
            .addFields({
                name: '1. Fortnite',
                value: `${emojis.money} 100`
            }, {
                name: '2. Rocket League',
                value: `${emojis.money} 300`
            }, {
                name: '3. GTA V',
                value: `${emojis.money} 600`
            }, {
                name: '4. Super Smash Bros Ultimate',
                value: `${emojis.money} 1000`
            })
            .setColor('#5c72ec')
        const page2 = new Discord.MessageEmbed()
            .setTitle('Page 2')
            .setDescription(description)
            .addFields({
                name: '5. Resident Evil',
                value: `${emojis.money} 2000`
            }, {
                name: '6. Super Mario 3D world',
                value: `${emojis.money} 3000`
            }, {
                name: '7. LEGO Star Wars',
                value: `${emojis.money} 5000`
            }, {
                name: '8. Gamers Rising Simulator',
                value: `${emojis.money} 10000`
            })
            .setColor('#5c72ec')
        new rm.menu({
            channel: message.channel,
            userID: message.author.id,
            pages: [
                page1,
                page2
            ]
        })
    }
}
