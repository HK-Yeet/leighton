const schema = require('../schemas/posts')
const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')
const sentence = 'Incorrect usage! Use: !delete <post id or all>'

module.exports = {
    name: "delete",
    alias: ['del'],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let account = await database.ref(`Profiles/${message.author.id}`).once('value')
        account = account.val()
        
        if(!account) return message.channel.send("You don't have an account created")
        
        if(!args[0]) return message.channel.send(sentence)
        const filter = m => m.author.id === message.author.id

        if(isNaN(args[0])) {
            if(args[0] !== 'all') return message.channel.send(sentence)
            else {
                do {
                    try {
                        message.channel.send('Are you sure you want to delete all of your posts?\nType `yes` or `no`')
                        let collected = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 10000,
                        errors: ['time']
                    })
                        entry = collected.first().content.toLowerCase()
                        if (entry === 'yes') {

                            let results = await schema.findOne({_id: message.author.id})

                            if(!results || !results.post) return message.reply('You don\'t have any posts')
                            let number = results.post.length
                            if(!number || number < 0) return message.reply('You don\'t have any posts')

                            results.post.forEach(async n => { 
                                await schema.findOneAndUpdate({_id: message.author.id}, {$pull: { post: n }})
                                await database.ref(`Posts/${n}`).remove()
                            })

                            message.channel.send('Deleted all of your posts :flushed:')
                    
                            return
                        } else if (entry === 'no') {
                            return message.reply('Cancelled.')
                        } else message.reply('Please enter a valid response.')
                    } catch (ex) {
                        console.log(ex)
                        message.reply('No response was given in the given time.')
                        break
                    }
                } while (entry != 'yes' && entry != 'no')
              

            }
        } else {

            let resultado = await schema.findOne({_id: message.author.id})
            if(!resultado || !resultado.post) return message.reply('You don\'t have any posts')
            let number = resultado.post.length
            if(!number || number < 0) return message.reply('You don\'t have any posts')


            // 102
        }






           
    }}