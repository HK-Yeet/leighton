const { MessageEmbed } = require("discord.js");
module.exports = (bot, hkandler, guild) => {
  const channel = guild.channels.cache.find(
    (c) =>
      c.type === "text" &&
      c.permissionsFor(guild.me).has(["SEND_MESSAGES", "EMBED_LINKS"])
  );

  let embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("👋 Hello There")
    .setDescription(
      `I'm ${bot.user.tag}! My prefix is \`${hkandler.prefix}\`.`
    );
  channel.send(embed);
};