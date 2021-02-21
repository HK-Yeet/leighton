const Canvas = require('canvas')
const moment = require('moment')
const Discord = require('discord.js')
const randomWords = require('random-words')
const txtgen = require('txtgen')
const emojis = require('../objects/emojis.json')
const scramble = require('wordscramble')
const schema = require('../schemas/posts')
const gameSchema = require('../schemas/items')
const { coin } = require('../objects/emojis.json')
const convert = require('../functions/dates')

module.exports = {
    name: "tweet",
    aliases: ["twitter", "post"],
    category: 'Social Media',
    description: 'Upload a tweet to Twitter!\nWatch out, not tweeting at least once a day will make you lose followers!',
    clientPerms: ["SEND_MESSAGES"],
    callback: async (bot, message, args, hkandler, database) => {

        let account = await database.ref(`Profiles/${message.author.id}`).once('value')
        account = account.val()
        
        if(!account) return message.channel.send("You don't have an account created")

        let dataCooldown = await database.ref(`Cooldowns/Upload/${message.author.id}`).once('value')
        dataCooldown = dataCooldown.val()

        if(!dataCooldown || Date.now() >= dataCooldown.time + 1000 * 60 * 10) {

    await database.ref(`Cooldowns/Tweet/${message.author.id}`).remove()

        const filter = m => m.author.id === message.author.id
        const author = message.author
        message.delete()
        async function sendTweet() {
            let text = '';
            let pog = 0;
            let length = 0;
            let sentence = args.length > 0 && args.length < 60 ? args : txtgen.sentence().split(' ')
            for (i = 0; i < sentence.length; i++) {
                if (pog < 6) text += `${sentence[i]} `
                else {
                    text += `${sentence[i]}\n`
                    pog = 0
                }
                pog++
            }
            let user = message.author
            //The author change this
            let random = Math.floor(Math.random() * 100) + 1
            // Gets a random number from 1 to 100 it's for likes
            const canvas = Canvas.createCanvas(597, 391)
            // Creates a blank template
            const ctx = canvas.getContext('2d')
            // Gets the context
            const b = await Canvas.loadImage(user.displayAvatarURL({
                size: 4096,
                format: 'png'
            }))
            // Loads the avatar of the user
            const a = await Canvas.loadImage('https://cdn.discordapp.com/attachments/776817678517534771/807391551403327518/XDDDDDDDDDDDDD.png')
            // Loads the twitter template
            ctx.drawImage(b, 10, 35, 52, 52)
            // Draws in the blank template the user's avatar
            ctx.drawImage(a, 0, 0)
            // Draws in the blank template the twitter template
            ctx.font = '20px Arial';
            // Text font 
            ctx.fillStyle = '#ffffff';
            // Text Color 
            ctx.fillText(user.username, canvas.width / 7.6, canvas.height / 7.2);
            // The text will be the user username


            ctx.font = '25px Arial';
            // Text font 
            ctx.fillStyle = '#ffffff';
            // Text Color
            ctx.fillText(text, canvas.width / 30, canvas.height / 3);
            // The text will be Clefory is the best no cap(Change this to the words array)


            ctx.font = '17px Arial';
            // Text font
            ctx.fillStyle = '#9b9b9b';
            // Text color
            ctx.fillText(`@${account.username ? account.username : 'unknown'}`, canvas.width / 7.6, canvas.height / 5.2);
            // Example xJustClefory0002 | user: xJustClefory#0002


            ctx.font = '15px Arial';
            // Text Font
            ctx.fillStyle = '#9b9b9b';
            // Text Color 
            ctx.fillText(moment().format("HH:mm A . MMM D, YYYY") + '  •  Twitter Web App', canvas.width / 40, canvas.height / 1.77);
            // Date 

            ctx.font = '15px Arial';
            // Text font 
            ctx.fillStyle = '#ffffff';
            // Text Color
            ctx.strokeStyle = '#ffffff';
            // This is not important dont change this
            let number;
            if (random < 10) {
                number = canvas.width / 35
            } else {
                number = canvas.width / 60
            }
            // Some canvas logic
            ctx.fillText(random, number, canvas.height / 1.221);
            // Ignore this dont change
            ctx.strokeText(random, number, canvas.height / 1.221);
            // Ignore this dont change
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'twitter.png')
            // The attachment

            message.channel.send(`${emojis.twitter} Uploading your tweet!`).then(message2 => {
                setTimeout( async() => {
                    message2.delete()
                    let url = await message2.channel.send(`<:Twitter:808067779395715113> Hey, everyone look!\n${user} has just uploaded a new tweet!`, attachment)
                    url = url.attachments.first().url
                    let number = await database.ref(`Number`).once('value')
                    number = number.val()

                    if(!number) {
                        number = 100
                        await database.ref(`Number`).set({
                            id: number
                        })
                    } else {
                        number = number.id
                    number++
                    await database.ref(`Number`).update({
                        id: number
                    })
                }

                await database.ref(`Posts/${number}`).set({
                    url: url,
                    user: message.author.id,
                    likes: random
                })

                await database.ref(`Profiles/${message.author.id}`).update({
                    likes: account.likes ? account.likes + random : random
                })

                await schema.findOne({
                    _id: message.author.id
                })

                if(!schema) return
                
                await schema.findOneAndUpdate({ _id: message.author.id }, { $push: { post: number } } )
                    setTimeout(async() => {

                        let bonus = 1
                        let winMessage;

                        if (random > 35) {
                            let subsGain = (Math.floor(Math.random() * (random < 50 ? 16 : (random < 70 ? 21 : (random < 90 ? 41 : 61))) + (random < 50 ? 5 : 20) * (1 + (0.5 * (bonus)))))
                            subsGain = Math.floor(subsGain)
                            let extraCoins = Math.floor(Math.random() * 30) + 3

                            let games = await gameSchema.findOne({_id: message.author.id})
                            if(!games || games.itens.length <= 0) {
                                bonus = 1
                                winMessage = `${author}, due to recent success on your tweet...\nYou have managed to gain **${subsGain}** followers and ${coin} ${extraCoins}!`
                            } else {
                                bonus = games.itens.length
                                winMessage = `${author}, due to recent success on your tweet...\nYou have managed to gain **${subsGain}** followers and ${coin} ${extraCoins}! [${(1 + (0.5 * (bonus))).toFixed()}x Games Bonus]`
                            }

                            await database.ref(`Profiles/${message.author.id}`).update({
                                followers: account.followers ? account.followers + subsGain : subsGain,
                                money: account.money ? account.money + extraCoins : extraCoins
                            })
                            message.channel.send(winMessage)
                        } else {
                            const subsLoss = Math.floor(Math.random() * 25)
                            let tieOrLossMessage = ' '
                            

                            if(!account.followers || account.followers < subsLoss) tieOrLossMessage = `${author}, unfortunately, your recent tweet did nothing...`
                            else {
                                tieOrLossMessage = `${author}, unfortunately, your recent tweet has done horribly...\nYou have managed to lose **${subsLoss}** followers!`
                                await database.ref(`Profiles/${message.author.id}`).update({
                                    followers: Math.floor(account.followers - subsLoss)
                                })
                            }
                            message.channel.send(tieOrLossMessage)
                        }
                    }, 10000)
                }, 4000)
            })
            //Sends the attachment
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
            const msg = await message.channel.send(`${emojis.twitter} **Twitter task!**:\nWrite the following word!\n${word}`)
            try {
                const collected = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                })
                if (collected.first().content.toLowerCase() === ogWord.join(' ')) {
                    msg.delete()
                    collected.first().delete()
                    sendTweet()
                } else return message.channel.send('You lose!')
            } catch (ex) {
                return message.channel.send('Time\'s up!')
            }
        } else if (randomGame === '1') {
            const msg1 = await message.channel.send(`${emojis.twitter} **Twitter task!**:\nWrite the name of this server\'s owner!`)
            try {
                const collected1 = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                })
                const owner = await message.guild.members.fetch(message.guild.ownerID)
                if (!collected1.first()) return
                if (collected1.first().content.toLowerCase() === owner.displayName.toLowerCase() || collected1.first().content.toLowerCase() === owner.user.username.toLowerCase()) {
                    msg1.delete()
                    collected1.first().delete()
                    sendTweet()
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
            const msg2 = await message.channel.send(`${emojis.twitter} **Twitter task!**:\nWrite the name of this social media!\n${socials[randomSocial]}`)
            try {
                const collected2 = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 10000,
                    errors: ['time']
                })
                if (!collected2.first()) return
                if (collected2.first().content.toLowerCase() === socials[randomSocial + 1]) {
                    msg2.delete()
                    collected2.first().delete()
                    sendTweet()
                } else return message.channel.send(`You lose!\nThe word was ${socials[randomSocial + 1]}!`)
            } catch (ex) {
                console.log(ex)
                return message.channel.send(`Time\'s up!\nThe word was ${socials[randomSocial + 1]}!`)
            }
        } else if (randomGame === '3') {
            const words = ['youtube', 'twitter', 'twitch', 'instagram', 'leighton', 'media', 'social', 'camera', 'post', 'follower', 'subscribe', 'like', 'block', 'discord', 'email', 'photo', 'video', 'trend', 'tiktok']
            const randomWord = words[Math.floor(Math.random() * words.length)]
            const msg2 = await message.channel.send(`${emojis.twitter} **Twitter task!**:\nUnscramble the following word! (Social media related!):\n\n${scramble.scramble(randomWord)}`)
            try {
                const collected2 = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 5000,
                    errors: ['time']
                })
                if (!collected2.first()) return
                if (collected2.first().content.toLowerCase() === randomWord) {
                    msg2.delete()
                    collected2.first().delete()
                    sendTweet()
                } else return message.channel.send(`You lose!\nThe word was ${randomWord}`)
            } catch (ex) {
                console.log(ex)
                return message.channel.send(`Time\'s up!\nThe word was ${randomWord}`)
            }}
        } else {
        let tomorrow = dataCooldown.time + 1000 * 60 * 10
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

        return message.channel.send(`You have already tweeted!\nWait${final.replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('  ', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('z', ' ').replace('  ', ' ')}more to execute this command again!`) // we don't want 23 hours   12 seconds we want 23 hours 12 seconds
        }
    },
};
