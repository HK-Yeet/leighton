const { MessageEmbed } = require("discord.js");
module.exports = (bot, hkandler, guild) => {
  console.log(`Leighton has been added to ${guild.name}.`)
    let defaultChannel = "";
    const generalChannel = guild.channels.cache.find(ch => ch.name === 'general' && ch.permissionsFor(guild.me).has('SEND_PERMISSIONS'))
    if (generalChannel) defaultChannel = generalChannel
    else {
        guild.channels.cache.forEach((channel) => {
            if (channel.type == "text" && defaultChannel === "") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        })
    }
    defaultChannel.send('Hi there!\nThanks for inviting Leighton to your server.\n\nPlease type **\'!help\'** for a list of all of the bot\'s commands!\nIf you like our work, please make sure to vote for Leighton by typing **\'!upvote\'**. It\'ll help us a lot :)').catch(err => console.error(err))
};
