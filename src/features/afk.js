const firebase = require('firebase')
const database = firebase.database()
const convert = require('../functions/dates')

module.exports = (afk, hkandler) => {

   afk.on('message', async message => {

    if(message.author.bot) return

    if(!message.mentions) return
    if(!message.mentions.members.first() || !message.mentions.users.first() || !message.mentions.members.last() || !message.mentions.users.last()) return

    let person = message.mentions.members.first().user.id || message.mentions.users.first().id || message.mentions.members.last().user.id || message.mentions.users.last().id

    if(!person) {
        return
    } else {

        let data = await database.ref(`Server/${message.guild.id}/Afk/${person}`).once('value')
        data = data.val()
        if(!data) return           

                    let now = new Date()
                    
                    let before = data.date
                    let reason = data.reason
                    if(!reason) {
                        reason = 'AFK'
                    }
                    if(!before) {
                       return
                    }

                    let converted = convert(now, before, '-', 2)

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
                    let join = words.join(" ").trim()


                    const msg = await message.channel.send('I SAW THAT HMMMMMMMMMMMMMM')
                    msg.edit(`<@${person}> is AFK: ${reason || 'AFK'}, ${join} ago`)
                    return
                  }
           
})
   
}