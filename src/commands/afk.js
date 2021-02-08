const schema = require('../schemas/afk-schema')

module.exports = {
    name: "afk",
    aliases: ["idle"],
    cooldown: 30, //in seconds
    clientPerms: ["SEND_MESSAGES", "MANAGE_NICKNAMES"],
    callback: async (client, message, cannon, handler) => {

        let text = cannon.join(" ")
        if(!text || !cannon[0]) text = 'AFK'
        let max = 32
        let name = '[AFK]'
        let possible = max - name.length - 1
  
        const nickname = message.member.nickname || message.author.username
        const oldName = nickname 

        if(nickname > max) {
            nickname = nickname.split("").slice(0, possible).join('')
        }
        let newName = `${name} ${nickname}`

        
        

        let msg = `You are now AFK: ${text}`

        schema.findOne({
            _id: message.author.id,
          }, async(err, data) => {
            if(err) console.log(err)  
            
            if(data) {

                if(data.afk_servers.includes(message.guild.id)) {
                    return
                  } else {
                    message.channel.send(msg)
                    message.member.setNickname(newName)
                    .catch(() => console.log('No perms, but dont worry'))

                await schema.updateOne({
                    _id: message.author.id,
                },
                {
                    $push: {
                        afk_servers: message.guild.id,
                    afk_reasons: text,
                afk_old_names: nickname,
            afk_date: new Date()
            }
        })
        
        return
    }

            
            } else {

                message.channel.send(msg)
                message.member.setNickname(newName)
                .catch(() => console.log('No perms, but dont worry'))
                
                data = new schema({
                    _id: message.author.id,
                    afk_servers: message.guild.id,
                    afk_reasons: text,
                    afk_old_names: nickname,
                    afk_date: new Date()
                })

                await data.save()
                return

                
            } 
       
})

}}
