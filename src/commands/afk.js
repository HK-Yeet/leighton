const schema = require('../schemas/afk-schema')
// :D
module.exports = {
    name: "afk",
    aliases: ["idle"],
    cooldown: 30, //in seconds
    clientPerms: ["SEND_MESSAGES", "MANAGE_NICKNAMES"],
    callback: async (client, message, cannon, handler) => {

        schema.findOne({
            _id: message.author.id,
          }, async(err, data) => {
            if(err) console.log(err)  
            
            if(data) {
                return
            } else {
                message.channel.send(`You are now AFK: ${text}`)

        let max = 32
        let name = '[AFK]'
        let possible = max - name.length - 1

        let text = cannon.join(" ")

        if(!text || !cannon[0]) text = 'AFK'
     
        const nickname = message.member.nickname || message.author.username
        const oldName = nickname 

        if(nickname > max) {
            nickname = nickname.split("").slice(0, possible).join('')
        }
        let newName = `${name} ${nickname}`

        message.member.setNickname(newName)
        .catch(() => console.log('No perms, but dont worry'))
        
                const newScheama = new schema({
                    _id: message.author.id,
                    server: message.guild.id,
                    logChannelID: null,
                    reason: text,
                    date: new Date()
                });

                await newScheama.save()
              
            }

           })
        
},
  };
  