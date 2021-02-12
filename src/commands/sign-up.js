const Schema = require('../schemas/acc')
module.exports = {
    name: "sign-up",
    aliases: ["log-in"],
    clientPerms: ["SEND_MESSAGES"],
    callback: async (client, message, args, hkandler, database) => {

        let data = await database.ref(`Profiles/${message.author.id}`).once('value')
      data = data.val()

      
      if(!data || !data.username) {
        const filter = m => m.author.id === message.author.id
        const results = await Schema.findOne({
            find: 'acc-find',
          }, async(err, info) => {
            if(err) console.log(err)
            let names = []
            if(info != null) {
         names = info.name
            }
        let nameNew = '';
        do {
          await message.channel.send('Enter a username!')
          try {
            const msg = await message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ['time']
            })
            console.log(names)
            nameNew = msg.first().content.toLowerCase().split(/[ ]+/)[0]
            if (names.some(name => nameNew.toLowerCase() === name.toLowerCase())) message.reply('Someone already has this username!')
            else message.reply(`Account created! Your name is @${nameNew}`)
          } catch { return message.reply('Time\'s up!') }
        } while (names.some(name => nameNew.toLowerCase() === name.toLowerCase()))

        database.ref(`Profiles/${message.author.id}`).set({
            username: nameNew
        })
        
            if(!info) {

                const newSchema = new Schema({
                    name: nameNew,
                    find: 'acc-find'
                });
                newSchema.save()
            // code here if the data doesn't exist
            } else {

                
                await Schema.findOneAndUpdate({
                    find: 'acc-find',
                },
                    {
                    $push: {
                      name: nameNew
                    }
                },
                {
                    upsert: true,
                  }
                )
             // code here if there is data so .findOneAndUpdate
           }
})

      } else {
          data = data.username
          return message.channel.send(`You have already an account created\n@${data}`)
      }
    }
}