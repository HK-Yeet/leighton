const schema = require('../schemas/posts')
const Discord = require('discord.js')
const { coin } = require('../objects/emojis.json')

module.exports = {
    name: "delete",
    alias: ['del'],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let account = await database.ref(`Profiles/${message.author.id}`).once('value')
        account = account.val()
        
        if(!account) return message.channel.send("You don't have an account created")
        
        if(!args[0]) return message.channel.send("Incorrect syntax!\nUsage: !delete <post id>")
        const filter = m => m.author.id === message.author.id

        if(isNaN(args[0])) return message.channel.send('Invalid post id!')         
        
        let results = await schema.findOne({_id: message.author.id})
        if(!results) return message.channel.send('You don\'t have any posts')
        if(!results.post || results.post.length <= 0) return message.channel.send('You don\'t have any posts')
        
        if(!results.post.includes(Number(args[0]))) return message.channel.send('That post isn\'t yours')

        message.channel.send('Deleted post ' + args[0] + '!')

        await schema.findOneAndUpdate({_id: message.author.id}, { $pull: { post: Number(args[0]) } })

        let likes = await database.ref(`Posts/${Number(args[0])}`).once('value')
        likes = likes.val()
        let like = likes.likes || 0
        
        await database.ref(`Profiles/${message.author.id}`).update({
            likes: account.likes ? (account.likes - like) : 0
        })
        await database.ref(`Posts/${Number(args[0])}`).remove()
    
    }}