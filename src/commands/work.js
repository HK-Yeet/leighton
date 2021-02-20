const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
const convert = require('../functions/dates')
module.exports = {
    name: "work",
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
    data = data.val()

    if(!data) return channel.send("You don't have an account created")

    let dataCooldown = await database.ref(`Cooldowns/Work/${message.author.id}`).once('value')
    dataCooldown = dataCooldown.val()

    if(!dataCooldown || Date.now() >= dataCooldown.time + 1000 * 60 * 60 * 2) {

    await database.ref(`Cooldowns/Work/${message.author.id}`).remove()
    let random = Math.floor(Math.random() * 35) + 1
    let cash = data.money || 0

    message.channel.send(`You worked and got ${coin} **${random}**`)
    await database.ref(`Profiles/${message.author.id}`).update({money: cash + random})
    await database.ref(`Cooldowns/Work/${message.author.id}`).set({time: Date.now()})
    return
    } else {
        let tomorrow = dataCooldown.time + 1000 * 60 * 60 * 2
        let now = Date.now()

        let converted = convert(tomorrow, now, '-', 2)

        let days = converted[0]
                    let hours = converted[1]
                    let minutes = converted[2]
                    let seconds = converted[3]

                    let dias = 'days'
                    let horas = 'hours'
                    let minutos = 'minutes'
                    let segundos = 'seconds'

                    if(days <= 0) {
                        days = '' 
                        dias = ''
                    }
                    if(days == 1) dias = 'day'

                    if(hours <= 0) {
                        hours = '' 
                        horas = ''
                    }
                    if(hours == 1) horas = 'hour'

                    if(minutes <= 0) {
                        minutes = '' 
                        minutos = ''
                    }
                    if(minutes == 1) minutos = 'minute'

                    if(seconds <= 0) {
                        seconds = '' 
                        segundos = ''
                    }
                    if(seconds == 1) segundos = 'second'

                    let words = [days, dias, hours, horas, minutes, minutos, seconds, segundos]
                   
                    let final = ''

                    words.forEach(word => final = final.trim() + word.trim() + 'z')

        return message.channel.send(`Take a break for${final.replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('  ', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ')}!\nYou have already worked`) // we don't want 23 hours   12 seconds we want 23 hours 12 seconds
    }




}}