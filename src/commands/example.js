
module.exports = {
  name: "example",
  aliases: ["ex"],
  cooldown: 5, //in seconds
  onwerOnly: true, //set owners in config.json,
  clientPerms: ["SEND_MESSAGES"],
  userPerms: ["KICK_MEMBERS"],
  minArgs: 3, 
  maxArgs: 5,
  callback: async (bot, message, args, hkandler, database) => {

      let data = await database.ref(`Profiles/${person}`).once('value')
      data = data.val()
      
      if(!data) {
         return channel.send("You don't have an account created")
      } else {
        message.channel.send('Worked')
      } 
  },
};
