const schema = require('../schemas/items')
const Schema = require('../schemas/posts')
const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')

module.exports = {
    name: "profile",
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

      if(!data2) return message.channel.send(`<@${data._id}> doesn't have an account created or doesn't have any posts`)

     
      let games = await schema.findOne({_id: data._id})

      let posts = 'No posts'
      if(data && data.post.length > 0) posts = '**»** ' + data.post.slice(0, 6).join(',\n**»** ')

      let itens = 'No games'
      if(games && games.itens.length > 0) itens = '**»** ' + games.itens.join(',\n**»** ')

     
      const embed = new Discord.MessageEmbed()


      let weKnowWho = await client.users.fetch(data._id)

      if(!weKnowWho) embed.setTitle(`@${data2.username ? data2.username : 'Unknown'} Game Card`)
      else embed.setAuthor(`@${data2.username ? data2.username : 'unknown'}`, weKnowWho.displayAvatarURL({dynamic: true})).setThumbnail(weKnowWho.displayAvatarURL({ dynamic: true }))

      
      embed.setDescription(`Balance: ${coin} ${data2.money || 0}`)
      .addFields(
          {name: 'Username',
          value: `@${data2.username ? data2.username : 'unknown'}`,
          inline: true}, {
            name: 'Followers',
            value: data2.followers ? data2.followers : 0,
            inline: true
        }, {
            name: 'Likes',
            value:  data2.likes ? data2.likes : 0,
            inline: true
        }, {
            name: 'Some Posts',
            value: posts,
            inline: false
        }, {
            name: 'Games',
            value: itens,
            inline: false
        })
          .setColor('RANDOM')

          return message.channel.send(embed)
    }}