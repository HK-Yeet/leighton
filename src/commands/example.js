module.exports = {
  name: "example",
  aliases: ["ex"],
  cooldown: 5, //in seconds
  onwerOnly: true, //set owners in index.js,
  clientPerms: ["SEND_MESSAGES"],
  userPerms: ["KICK_MEMBERS"],
  minArgs: 3,
  maxArgs: 5,
  callback: async (bot, message, args, hkandler) => {
    /*
        you can use execute as well
        */
  },
};
