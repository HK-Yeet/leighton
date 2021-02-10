const firebase = require('firebase')
const database = firebase.database()


module.exports = (feature, hkandler) => {

   feature.on('message', async message => {

    if(message.channel.type == 'dm') return

    let person = message.author.id

    if(!person) {
        return
    } else {

        let data = await database.ref(`Server/${message.guild.id}/Afk/${person}`).once('value')
        data = data.val()
        if(!data) return      
        let newName;
        
        if(!message.member.nickname) { 
            newName = message.author.username
        } else {
            newName = message.member.nickname.replace('[AFK]', '').trim()
        }

        message.member.setNickname(newName)
        .catch(() => console.log("No perms dude"))

                    message.channel.send(`Welcome back <@${person}>, I removed your afk`)

                    database.ref(`Server/${message.guild.id}/Afk/${person}`).remove()
                    return
                  }
           
})
   
}