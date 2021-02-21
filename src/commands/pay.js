const schema = require('../schemas/items')
const Schema = require('../schemas/posts')
const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
module.exports = {
    name: "pay",
    description: 'Give money to someone!',
    category: 'Economy',
    clientPerms: ["SEND_MESSAGES"],
    cooldown: 5,
    callback: async (client, message, args, hkandler, database) => {

        let accountUser1 = await database.ref(`Profiles/${message.author.id}`).once('value')
     accountUser1 = accountUser1.val()
      
      if(!accountUser1) return message.channel.send("You don't have an account created")

        if(message.mentions == true) {
            person = message.mentions.users.first().id
            console.log(person)
        } else if (args[0]) {
            person = args[0].toLowerCase().replace('@', '').trim()
        } else return message.channel.send('Invalid person! Use <@username or username>')

        let data = await Schema.findOne({
            _id: person,
          })

          if(!data) data = await Schema.findOne({name: person})

          console.log(data)

          if(!data) return message.channel.send('I can\'t find any account :/')

        let data2 = await database.ref(`Profiles/${data._id}`).once('value')
      data2 = data2.val()

      if(!data2) return message.channel.send(`<@${data._id}> doesn't have an account created or doesn't have any posts`)

      const user1 = message.author
      const user2 = await client.users.fetch(data._id)

      if(!user2) return message.channel.send('Unknown user')

      let accountUser2 = await database.ref(`Profiles/${user2.id}`).once('value')
      accountUser2 = accountUser2.val()

      if(!accountUser2) return message.channel.send(`<@${user2.id}> doen't have an account created!`)
      if(isNaN(args[1])) return message.channel.send('Invalid number')

      let cash = parseInt(args[1])
      if(cash < 10) return message.channel.send(`${coin} **10** is the minimum of money which you can give`) 
      let totalCash = accountUser1.money || 0
      let totalCash2 = accountUser2.money || 0

      if(cash > totalCash) return message.channel.send(`You only have ${coin} **${totalCash}** and you want to give ${coin} **${cash}**`)
      if(cash > (totalCash / 2)) return message.channel.send(`You are trying to send more than half of your money!`)

      try {

      // check cooldown
      let userIsInServer = await message.guild.members.fetch(user2.id)
      if(!userIsInServer) return message.channel.send(`@${accountUser2.username} isn't in this server`)

      } catch (err) {
        return message.channel.send(`@${accountUser2.username} isn't in this server`)
      }

      message.channel.send(`${user2}, ${user1} wants to give you ${coin} **${cash}**\nType \`yes\` or \`no\``)

      const filter = m => m.author.id === user2.id
      do {
        try {
            const collected = await message.channel.awaitMessages(filter, {
            max: 1,
            time: 14000,
            errors: ['time']
        })
            entry = collected.first().content.toLowerCase()
            if (entry === 'yes') {
                message.reply(`You have successfully received ${coin} **${cash}** from @${accountUser1 ? accountUser1.username : 'unknown'}!`)

                await database.ref(`Profiles/${message.author.id}`).update({money: (totalCash - cash)})
                await database.ref(`Profiles/${user2.id}`).update({money: (totalCash2 + cash)})

                return
            } else if (entry === 'no') {
                await message.reply('Cancelled.')
                return
            } else message.reply('Please enter a valid response.')
        } catch (ex) {
            console.log(ex)
            return message.reply('No response was given in the given time.')
            
            break
        }
    } while (entry != 'yes' && entry != 'no')


    }}
