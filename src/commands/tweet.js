const Canvas = require('canvas')
const moment = require('moment')
const Discord = require('discord.js')
const randomWords = require('random-words')
const txtgen = require('txtgen')
const emojis = require('../objects/emojis.json')
const scramble = require('wordscramble')
const schema = require('../schemas/posts')

module.exports = {
    name: "tweet",
    aliases: ["twitter", "post"],
    category: 'Social Media',
    description: 'Upload a tweet to Twitter!\nWatch out, not tweeting at least once a day will make you lose followers!',
    cooldown: 60 * 60,
    clientPerms: ["SEND_MESSAGES"],
    callback: async (bot, message, args, hkandler, database) => {

        let account = await database.ref(`Profiles/${message.author.id}`).once('value')
        account = account.val()
        
        if(!account) return message.channel.send("You don't have an account created")

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
            // Gets a random number from 1 to 100 
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
            ctx.fillText('@' + user.tag.split('#').join(''), canvas.width / 7.6, canvas.height / 5.2);
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
                    user: message.author.id
                })

                await schema.findOne({
                    _id: message.author.id
                })

                if(!schema) return
                
                await schema.findOneAndUpdate({ _id: message.author.id }, { $push: { post: number } } )
                    setTimeout(() => {

                        
                        if (random > 35) {
                            const subsGain = Math.floor(Math.random() * (random < 50 ? 16 : (random < 70 ? 21 : (random < 90 ? 41 : 61)))) + (random < 50 ? 5 : 20)
                            message.channel.send(`${author}, due to recent success on your tweet...\nYou have managed to gain **${subsGain}** followers!`)
                        } else {
                            const subsLoss = Math.floor(Math.random() * 25)
                            message.channel.send(`${author}, unfortunately, your recent tweet has done horribly...\nYou have managed to lose **${subsLoss}** followers!`)
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
            const words = ['youtube', 'twitter', 'twitch', 'instagram', 'leighton', 'media', 'social', 'camera', 'post', 'follower', 'subscribe']
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
            }
        }
    },
};
