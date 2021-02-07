import { Message, MessageEmbed } from "discord.js";

function filter(message: Message) {
  if (message.author.bot) {
    return true;
  } else if (!message.guild) {
    return true;
  } else {
    return false;
  }
}

function quickEmbed(channel: any, content: string) {
  let embed = new MessageEmbed().setColor("BLUE").setDescription(`${content}`);
  if (
    !channel.guild &&
    !channel
      .permissionsFor(channel.guild.me)
      .has(["SEND_MESSAGES", "EMBED_LINKS"])
  )
    return;
  return channel.send(embed);
}

function successEmbed(channel: any, content: string) {
  if (
    !channel.guild &&
    !channel
      .permissionsFor(channel.guild.me)
      .has(["SEND_MESSAGES", "EMBED_LINKS"])
  )
    return;
  let embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("✅・ Success")
    .setDescription(`${content}`);
  return channel.send(embed);
}

function errorEmbed(channel: any, content: string) {
  if (
    !channel.guild &&
    !channel
      .permissionsFor(channel.guild.me)
      .has(["SEND_MESSAGES", "EMBED_LINKS"])
  )
    return;
  let embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("❌・ Error")
    .setDescription(`${content}`);
  return channel.send(embed);
}

export { filter, quickEmbed, errorEmbed, successEmbed };
