const Schema = require('../schemas/posts')
const Discord = require('discord.js')
module.exports = {
    name: "posts",
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let person;
        if(message.mentions == true) {
            person = message.mentions.users.first().id
            console.log(person)
        } else if (args[0]) {
            person = args[0].toLowerCase().replace('@', '').trim()
        } else person = message.author.id

        let data = await Schema.findOne({
            _id: person,
          })

          if(!data) data = await Schema.findOne({name: person})

          console.log(data)

          if(!data) return message.channel.send('I can\'t find any account :/')

        let data2 = await database.ref(`Profiles/${data._id}`).once('value')
      data2 = data2.val()

      if(!data2) {

        return message.channel.send(`<@${data._id}> doesn't have an account created or doesn't have any posts`)

      } else {

        

            if(!data) {
                return message.channel.send(`<@${data._id}> doesn't have an account created`)
            } else {
                if(!data.post[0]) return message.channel.send(`<@${data._id}> doesn't have any posts`)
                else {
                    const ids = data.post
                    const generateEmbed = param => {
                    const current = ids.slice(param, param + 10)

                    let description = ''.trim()

                    current.forEach(id => description += '**ID:** `' + id + '`\n')
                      
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`@${data.name} posts ${param + 1 }-${param + current.length}/${ids.length}`)
                    .setColor('RANDOM')
                    .setDescription(description)
                    
                    return embed
                }

                
                const msg = await message.channel.send(generateEmbed(0))
                  if (ids.length <= 10) return
                  await msg.react('➡️')
                  const collected = msg.createReactionCollector((reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id, {time: 60000}
                  )
                  let index = 0
                  collected.on('collect', async reaction => {
                     msg.reactions.removeAll()
                      reaction.emoji.name === '⬅️' ? index = index - 10 : index = index + 10
                      msg.edit(generateEmbed(index))
                      if (index !== 0) await msg.react('⬅️')
                      if (index + 10 < ids.length) await msg.react('➡️')
                })
           



      }
    }
    
    }
}}