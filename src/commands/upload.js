const Discord = require("discord.js");

module.exports = {
  name: "upload",
  cooldown: 60 * 60, //in seconds
  clientPerms: ["SEND_MESSAGES"],
  callback: async (bot, message, args, hkandler) => {
    message.channel
      .send("<:YouTube:807695596235259986> Uploading your video...")
      .then((message) => {
        setTimeout(() => {
          message.edit("\u200B", {
            embed: {
              title: "Done!",
              color: "RED",
              description: "Your video has been uploaded to YouTube!",
            },
          });
        }, 5000);
      });
  },
};
