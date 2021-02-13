const Schema = require('../schemas/posts')
const Discord = require('discord.js')
module.exports = {
    name: "posts",
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let person;
        if(typeof message.mentions.users !== 'undefined') {
            person = message.mentions.users.first().id
        } else if (args[0]) {
            person = args[0].replace('@', '').trim()
        } else person = message.author.id

        const data = await Schema.findOne({
            person,
          })

        let data2 = await database.ref(`Profiles/${data}`).once('value')
      data2 = data2.val()

      if(!data2 || !data2.username) {

        return message.channel.send(`<@${person}> doesn't have an account created`)

      } else {

        

            if(!data) {
                return message.channel.send(`<@${person}> doesn't have an account created`)
            } else {
                if(!data.posts[0]) return message.channel.send(`<@${person}> doesn't have any posts`)
                else {
                    const ids = data.posts
                    const generateEmbed = param => {
                    const current = ids.slice(param, param + 10)
                      
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${person.username} posts ${param + 1}/${param + current.length} of ${ids.length}`)
                    current.forEach(id => embed.addField('Post ' + current, `**ID:** ${id}`))
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