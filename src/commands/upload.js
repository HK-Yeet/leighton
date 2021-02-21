const Discord = require("discord.js");
const randomWords = require('random-words')
const emojis = require('../objects/emojis.json')
const scramble = require('wordscramble')
const txtgen = require('txtgen')
const convert = require('../functions/dates')
const canvas = require('canvas')

module.exports = {
  name: "upload",
  clientPerms: ["SEND_MESSAGES"],
  callback: async (bot, message, args, hkandler, database) => {

    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
     data = data.val()
      
      if(!data) {
         return channel.send("You don't have an account created")
      } else {

        const filter = m => m.author.id === message.author.id


        let dataCooldown = await database.ref(`Cooldowns/Upload/${message.author.id}`).once('value')
        dataCooldown = dataCooldown.val()

    if(!dataCooldown || Date.now() >= dataCooldown.time + 1000 * 60 * 40) {

    await database.ref(`Cooldowns/Upload/${message.author.id}`).remove()
    
    async function Upload() {
      const author = message.author
      const likes = Math.floor(Math.random() * 100) + 1
      const dislikes = Math.floor(Math.random() * 45) + 1
      const Canvas = canvas.createCanvas(877, 640)
      /// Creates the blank template
      const ctx = Canvas.getContext('2d')
      /// Context
      let owo = {
        uwu: 'IM SUS!!!?',
        ewe: 'https://cdn.discordapp.com/attachments/746512138666901516/811986754323611708/maxresdefault.png',
      }
      let pop = {
        uwu: 'HOW TO GET FREE NITRO 2021!!?',
        ewe: 'https://cdn.discordapp.com/attachments/804092319565217863/811981145675137024/maxresdefault.png',
      }
      let hol = {
        uwu: 'PEPE BRO?!!',
        ewe: 'https://cdn.discordapp.com/attachments/804092319565217863/812777269889204264/b2182e3c241691aba813d0743d5d0183.png',
      }
      //////////////// Objects The Title and the URL of the attachment
      const a = [pop, owo, hol]
      /// Put inside of the array the objects
      const puta = a[Math.floor(Math.random() * a.length)]
      /// Gets a random object
      const {
        uwu,
        ewe
      } = puta
      /// Gets the ULR and The title
      const breh = await canvas.loadImage(ewe)
      /// Print the attachment
      const lol = await canvas.loadImage('https://cdn.discordapp.com/attachments/746512138666901516/811980472392482836/AXD.png')
      /// Print the attachment
      const lel = await canvas.loadImage(message.author.displayAvatarURL({
        format: 'png',
        size: 4096
      }))
      /// Print the author pfp
      ctx.drawImage(breh, 0, 0, 900, 600)
      /// Prints the imagen in the template
      ctx.drawImage(lel, 20, 580, 52, 52)
      /// Prints the imagen in the template
      ctx.drawImage(lol, 0, 0, )
      /// Prints the imagen in the template

      ////////////////////////
      ctx.font = '20px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(message.author.username, Canvas.width / 9.6, Canvas.height / 1.045)
      ////////////////////////// Author username
      ctx.font = '21px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(uwu, Canvas.width / 32.6, Canvas.height / 1.18)
      /// Title
      ctx.font = '19px Arial'
      ctx.fillStyle = '#9b9b9b'
      ctx.fillText(dislikes, Canvas.width / 1.43, Canvas.height / 1.125)
      /// Dislikes
      ctx.font = '19px Arial'
      ctx.fillStyle = '#9b9b9b'
      ctx.fillText(likes, Canvas.width / 1.65, Canvas.height / 1.125)
      /// Likes
      const attachment = new Discord.MessageAttachment(Canvas.toBuffer(), 'youtube.png')
      /// Buffer the attachment
      /// Send the attachment
      const epic = `**Done!**\n${author}, your video has been uploaded to YouTube!`
      message.channel.send(`${emojis.youtube} Uploading your video...`).then(message2 => {
        setTimeout(async () => {
          await database.ref(`Cooldowns/Upload/${message.author.id}`).set({time: Date.now()})
          message2.delete()
          message.channel.send(epic, attachment)
          setTimeout(async () => {
            if (likes > dislikes) {
              const subsGain = Math.floor(Math.random() * (likes < 50 ? 16 : (likes < 70 ? 21 : (likes < 90 ? 41 : 61))) + (likes < 50 ? 5 : 20))
              let extraCoins = Math.floor(Math.random() * (70 - 40)) + 40

              await database.ref(`Profiles/${message.author.id}`).update({
                followers: data.followers ? data.followers + subsGain : subsGain,
                money: data.money ? data.money + extraCoins : extraCoins
            })

              message.channel.send(`${author}, due to recent success on your video...\nYou have managed to gain **${subsGain}** followers and ${emojis.coin} **${extraCoins}**!`)
            } else {
              const subsLoss = Math.floor(Math.random() * 25)

              let tieOrLossMessage = ' '
                            if(!data.followers || data.followers < subsLoss) tieOrLossMessage = `${author}, unfortunately, your recent upload did nothing...`
                            else {
                                tieOrLossMessage = `${author}, unfortunately, your recent upload has done horribly...\nYou have managed to lose **${subsLoss}** followers!`
                                await database.ref(`Profiles/${message.author.id}`).update({
                                    followers: Math.floor(data.followers - subsLoss)
                                })
                            }
              message.channel.send(tieOrLossMessage)
            }
          }, 10000)
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
      const msg = await message.channel.send(`${emojis.youtube} **YouTube task!**:\nWrite the following word!\n${word}`)
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
    }

   // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


     
  } else {
    let tomorrow = dataCooldown.time + 1000 * 60 * 40
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

        return message.channel.send(`You have already uploaded!\nWait${final.replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('  ', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('  ', ' ')}more to execute this command again!`) // we don't want 23 hours   12 seconds we want 23 hours 12 seconds
  }}}}