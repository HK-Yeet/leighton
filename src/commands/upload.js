const Discord = require("discord.js");
const randomWords = require('random-words')
const emojis = require('../objects/emojis.json')
const scramble = require('wordscramble')
const txtgen = require('txtgen')

module.exports = {
  name: "upload",
  cooldown: 60 * 60, //in seconds
  clientPerms: ["SEND_MESSAGES"],
  callback: async (bot, message, args, hkandler) => {



    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
      data = data.val()
      
      if(!data) {
         return channel.send("You don't have an account created")
      } else {
       

    const filter = m => m.author.id === message.author.id

    function Upload() {
      const Embed = new Discord.MessageEmbed()
        .setTitle('Done!')
        .setDescription(`${message.author}, your video has been uploaded to YouTube!`)
        .setColor('37A788')
        .setImage('https://i.imgur.com/TEeIhoi.gif')
      message.channel.send(`${emojis.youtube} Uploading your video...`).then(message => {
        setTimeout(() => {
          message.edit('', Embed)
        }, 5000)
      })
    }

    const randomGame = `${Math.floor(Math.random() * 4)}`

    if (randomGame === '0') {
      const ogWord = randomWords({
        exactly: 1
      })
      let word = '';
      ogWord.forEach(letter => {
        word += '`' + letter.split('').join(' ') + '` '
      })
      const msg = await message.channel.send(`${emojis.YouTube} **YouTube task!**:\nWrite the following word!\n${word}`)
      try {
        const collected = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 5000,
          errors: ['time']
        })
        if (collected.first().content.toLowerCase() === ogWord.join(' ')) {
          msg.delete()
          collected.first().delete()
          Upload()
        } else return message.channel.send('You lose!')
      } catch (ex) {
        return message.channel.send('Time\'s up!')
      }
    } else if (randomGame === '1') {
      const msg1 = await message.channel.send(`${emojis.youtube} **YouTube task!**:\nWrite the name of this server\'s owner!`)
      try {
        const collected1 = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 5000,
          errors: ['time']
        })
        const owner = await message.guild.members.fetch(message.guild.ownerID)
        if (!collected1.first()) return
        if (collected1.first().content.toLowerCase() === owner.displayName.toLowerCase() || collected1.first().content.toLowerCase() === owner.user.username.toLowerCase()) {
          msg1.delete()
          collected1.first().delete()
          Upload()
        } else return message.channel.send(`You lose!\nThe answer was ${owner.displayName}`)
      } catch (ex) {
        console.log(ex)
        const owner = await message.guild.members.fetch(message.guild.ownerID)
        return message.channel.send(`Time\'s up!\nThe answer was ${owner.displayName}!`)
      }
    } else if (randomGame === '2') {
      const socials = [`${emojis.youtube}`, 'youtube', `${emojis.twitter}`, 'twitter', `${emojis.instagram}`, 'instagram', `${emojis.twitch}`, 'twitch']
      const nums = [0, 2, 4, 6]
      const randomSocial = nums[Math.floor(Math.random() * nums.length)]
      const msg2 = await message.channel.send(`${emojis.youtube} **YouTube task!**:\nWrite the name of this social media!\n${socials[randomSocial]}`)
      try {
        const collected2 = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 5000,
          errors: ['time']
        })
        if (!collected2.first()) return
        if (collected2.first().content.toLowerCase() === socials[randomSocial + 1]) {
          msg2.delete()
          collected2.first().delete()
          Upload()
        } else return message.channel.send(`You lose!\nThe word was ${socials[randomSocial + 1]}!`)
      } catch (ex) {
        console.log(ex)
        return message.channel.send(`Time\'s up!\nThe word was ${socials[randomSocial + 1]}!`)
      }
    } else if (randomGame === '3') {
      const words = ['youtube', 'twitter', 'twitch', 'instagram', 'leighton', 'media', 'social', 'camera', 'post', 'follower', 'subscribe']
      const randomWord = words[Math.floor(Math.random() * words.length)]
      const msg2 = await message.channel.send(`${emojis.youtube} **YouTube task!**:\nUnscramble the following word! (Social media related!):\n\n${scramble.scramble(randomWord)}`)
      try {
        const collected2 = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 10000,
          errors: ['time']
        })
        if (!collected2.first()) return
        if (collected2.first().content.toLowerCase() === randomWord) {
          msg2.delete()
          collected2.first().delete()
          Upload()
        } else return message.channel.send(`You lose!\nThe word was ${randomWord}`)
      } catch (ex) {
        console.log(ex)
        return message.channel.send(`Time\'s up!\nThe word was ${randomWord}`)
      }
    }}
  },
};
