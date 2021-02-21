const schema = require('../schemas/posts')
const schema2 = require('../schemas/items')
const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')

module.exports = {
    name: "reset",
    description: 'Restart your account from scratch',
    category: 'Social Media',
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let account = await database.ref(`Profiles/${message.author.id}`).once('value')
        account = account.val()
        
        if(!account) return message.channel.send("You don't have an account created")
        const filter = m => m.author.id === message.author.id

        message.channel.send('Type `yes` or `no`')
        
        do {
            
            try {
                const collected = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ['time']
            })
                entry = collected.first().content.toLowerCase()
                if (entry === 'yes') {

                    let msg = await message.channel.send('Deleting everything <:bearr:810989681532600380>')

                    await database.ref(`Profiles/${message.author.id}`).remove()
                    await database.ref(`Cooldowns/Daily/${message.author.id}`).remove()
                    await database.ref(`Cooldowns/Work/${message.author.id}`).remove()
                    await database.ref(`Cooldowns/Upload/${message.author.id}`).remove()
                    let results = await schema.findOne({ _id: message.author.id })
                    if(!results) return
                    results.post.forEach(async p => { await database.ref(`Posts/${p}`).remove() })
                    await schema.findOneAndDelete({ _id: message.author.id })
                    let resultss = await schema.findOne({ _id: message.author.id })
                    if(!resultss) return
                    await schema2.findOneAndDelete({ _id: message.author.id })
                   
                    
                    msg.edit('Deleted! 😳')
                    
                    return
                    }  else if (entry === 'no') {
                    return message.reply('Cancelled.')
                } else message.channel.send('Are you sure you want to **delete** all of your **account**?\nYou will **lose** all of your **money, posts, special cooldowns, games**, etc.\nType `yes` or `no`')
            } catch (ex) {
                console.log(ex)
                message.reply('No response was given in the given time.')
                break
            }
        } while (entry != 'yes' && entry != 'no')
            
    }}
