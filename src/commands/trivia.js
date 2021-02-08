const { MessageEmbed } = require("discord.js");
//we'll need mongodb after

const questions = [
  "The majority of teens use Facebook",
  "What's the most followed Instagram account?",
  "What's the most subscribed YouTube channel?",
  "After Google, what is the second most popular website in the world?",
  "Which platform has a higher rate of engagement?",
  "What platform is the best at driving leads?",
];

const options = [
  "a) True \nb) False", // a yes, is true
  "a) @cristiano \nb) @instagram \nc @arianagrande", // b
  "a) T-Series \nb) PewDiePie \nc) Cocomelon - Nursery Rhymes", // a
  "a) Instagram \nb) Twitter \nc) Youtube", // c
  "a) Instagram \nb) Facebook", // a
  "a) Twitter \nb) Linkdln \nc) Facebook", //b
];

const answers = ["a", "b", "a", "c", "a", "b"];
let rand = Math.floor(Math.random() * questions.length);

// so the question 0 the options will be the options 0 i added a comment for the correct answer please add more
module.exports = {
  name: "trivia",
  cooldown: 20,
  callback: async (client, message, args, handler) => {
    
    const filter = (m) =>
      !m.author.bot && m.content.toLowerCase() == answers[rand];

    let embed = new MessageEmbed()
      .setTitle(questions[rand])
      .setDescription(options[rand]);
    const m = await message.channel.send(embed)
    try {
      const collector = await message.channel.awaitMessages(filter, {
        time: "10000",
        errors: ["time"],
        max: 1,
      });
      let win = new MessageEmbed()
        .setTitle(questions[rand])
        .setColor("GREEN")
        .setDescription(`${collector.first().author} got the correct answer!`)
      m.edit(win);
    } catch (error) {
      let loss = new MessageEmbed()
      .setTitle(questions[rand])
      .setColor("RED")
      .setDescription(`Looks like nobody got it this time. The correct answer is: ${answers[rand]}`)
      m.edit(loss)
    }
  },
};
