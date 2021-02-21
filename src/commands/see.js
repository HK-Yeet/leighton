const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "see",
    description: 'View a tweet by ID!',
    category: 'Social Media 2',
    aliases: ["explore"],
    cooldown: 5, //in seconds
    minArgs: 1, 
    maxArgs: 1,
    clientPerms: ["SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"],
    callback: async (bot, message, args, hkandler, database) => {

        if(isNaN(args[0])) return message.channel.send('That id looks weird dude')

        let post = await database.ref(`Posts/${args[0]}`).once('value')
        post = post.val()

        if(!post) return message.channel.send('That post doesn\'t exist')

        let user = post.user
        if(user) {
           let data = await database.ref(`Profiles/${user}`).once('value')
        data = data.val()
        user = data.username
        } else { user = 'unknown' }

        let url = post.url
        if(!url) return message.channel.send('Couldn\' find the post')

        let embed = new MessageEmbed()
        .setImage(url)
        .setFooter(`Posted by @${user}`)
        .setColor('RANDOM')

        message.channel.send(embed)
        return
  }}
  
