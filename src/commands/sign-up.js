const Schema = require('../schemas/posts')
module.exports = {
    name: "sign-up",
    aliases: ["log-in"],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let data = await database.ref(`Profiles/${message.author.id}`).once('value')
      data = data.val()

      
      if(data) {

        data = data.username
          return message.channel.send(`You have already an account created\n@${data}`)

      } else {


        const filter = m => m.author.id === message.author.id
       
        let nameNew = '';

          await message.channel.send('Enter a username!')
 
            const msg = await message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ['time']
            })
            nameNew = msg.first().content.toLowerCase().split(/[ ]+/)[0]
            const results = await Schema.findOne({name: nameNew})
     
            if (results) return message.reply('Someone already has this username!')
            else message.reply(`Account created! Your account is @${nameNew}`)
          


        database.ref(`Profiles/${message.author.id}`).set({
            username: nameNew
        })
        
            if(!results || results == null || typeof results._id == 'undefined') {

                const newSchema = new Schema({
                    name: nameNew,
                    _id: message.author.id
                });
                newSchema.save()

            } else {            
               return

           }   
          
      }
    }
}