module.exports = {
  name: "example",
  aliases: ["ex"],
  cooldown: 5, //in seconds
  onwerOnly: true, //set owners in config.json,
  clientPerms: ["SEND_MESSAGES"],
  userPerms: ["KICK_MEMBERS"],
  minArgs: 0, 
  maxArgs: null,
  callback: async (bot, message, args, hkandler, database) => {
    /*
        you can use execute as well
        */

        database.ref('Teting/uwu/owo').set({
          deu: 'sim'
        })
        message.channel.send('Worked')
  },
};
