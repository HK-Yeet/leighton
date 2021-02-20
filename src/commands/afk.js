module.exports = {
    name: "afk",
    aliases: ["idle"],
    cooldown: 30, //in seconds
    clientPerms: ["SEND_MESSAGES", "MANAGE_NICKNAMES"],
    callback: async (client, message, cannon, handler, database) => {

        let data = await database.ref(`Server/${message.guild.id}/Afk/${message.author.id}`).once('value')
        data = data.val()


            if(!data) {

                let text = cannon.join(" ")
        if(!text || !cannon[0]) text = 'AFK'
        let max = 32
        let name = '[AFK]'
        let possible = max - name.length - 1
  
        const nickname = message.member.nickname || message.author.username

        if(nickname > max) {
            nickname = nickname.split("").slice(0, possible).join('')
        }
        let newName = `${name} ${nickname}`     
        

        let msg = `You are now AFK: ${text}`

                    message.member.setNickname(newName)
                    .catch(() => console.log("No perms but dont worry"))
                    message.channel.send(msg)

                database.ref(`Server/${message.guild.id}/Afk/${message.author.id}`).set({
                    reason: text,
                    date: new Date().toString()
                })
            
            } else {           
                return
            } 
       


}}
