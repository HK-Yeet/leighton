const Discord = require('discord.js')
const emojis = require('../objects/emojis.json')

module.exports = {
    name: "buy",
    category: 'Economy',
    aliases: ['purchase'],
    description: 'Buy more games for your YouTube channel!',
    clientPerms: ['SEND_MESSAGES'],
    cooldown: 20,
    callback: async (client, message, args, handler, database) => {

        let data = await database.ref(`Profiles/${message.author.id}`).once('value')
        data = data.val()

        if(!data) return message.reply("You don't have an account created")
        const filter = m => m.author.id === message.author.id
        const games = ['Fortnite', 'Rocket League', 'GTA V', 'Super Smash Bros Ultimate', 'Resident Evil', 'Super Mario 3D World', 'LEGO Star Wars', 'Gamers Rising Simulator']
        const values = [100, 300, 600, 1000, 2000, 3000, 5000, 10000]

        if (!args[0]) return message.channel.send('Mention the game you want!\nType `!shop` for a list of all of the games!')
        if (isNaN(args[0])) return message.channel.send('The # of the game you mentioned is not a number!\nType `!shop` for a list of all of the games!')
        if (Number(args[0]) < 1 || Number(args[0]) > 8) return message.channel.send('Invalid game number!')
        const number = Number(args[0]) - 1

        let cash = data.money || 0
        if(cash < values[number]) return message.reply(`You don't have enough money to purchase **${games[number]}**, the price is ${emojis.money} **${values[number]}** and you have ${emojis.money} **${cash}**, see the difference?\nYou need more ${emojis.money} **${values[number] - cash}**`)
        await message.channel.send(`You are about to purchase ${games[number]} for ${emojis.money} **${values[number]}**!\nAre you sure? (Yes / No)`)
        entry = '';
        do {
            try {
                const collected = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
                entry = collected.first().content.toLowerCase()
                if (entry === 'yes') {
                    return message.reply(`you have successfully purchased ${games[number]} for ${emojis.money} **${values[number]}**!`)
                } else if (entry === 'no') {
                    return message.reply('Cancelled.')
                } else message.reply('Please enter a valid response.')
            } catch (ex) {
                console.log(ex)
                message.reply('No response was given in the given time.')
                break
            }
        } while (entry != 'yes' && entry != 'no')
    }
}
