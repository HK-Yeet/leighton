const { MessageEmbed } = require("discord.js");
//we'll need mongodb after

const questions = [
  "The majority of teens use Facebook",
  "What's the most followed Instagram account?",
  "What's the most subscribed YouTube channel?",
  "After Google, what is the second most popular website in the world?",
  "Which platform has a higher rate of engagement?",
  "What platform is the best at driving leads?",
  "Which of the following is not a reaction you can give to a Facebook post?",
  "Facebook was originally targeted at which demographic of users?",
  "What is the largest global social network (by total active users)?",
  "Which social network does not provide users with selfie filters?",
  "True or False: When Snapchat was created, the app was called ‘Picaboo.’",
  "Which social network does not allow you to post photos via a desktop computer?",
  "True or False: Twitter invented the #hashtag, which can now be found across several social media platforms.",
  "Which of the below is not a social network?",
  "True or False: After the 24-hour posting period, you can no longer view stats from your Instagram Stories.",
  "Which of the following count toward Twitter’s 140-character limit?",
  "Who holds the title of most retweeted tweet ever?"
];

const options = [
  "a) True \nb) False", // a yes, is true
  "a) @cristiano \nb) @instagram \nc @arianagrande", // b
  "a) T-Series \nb) PewDiePie \nc) Cocomelon - Nursery Rhymes", // a
  "a) Instagram \nb) Twitter \nc) Youtube", // c
  "a) Instagram \nb) Facebook", // a
  "a) Twitter \nb) Linkdln \nc) Facebook", //b
  "a) Thumbs up\nb) Clown\nc) Embarassed\nd) Poop", // c
  "a) College Students\nb) Children\nc) High Tech Enthustiasts\nd) Gaming Enthusiasts", // a
  "a) Twitter\nb) Instagram\nc) Discord\nd) Facebook", // d
  "a) Facebook\nb) Twitter\nc) Instagram\nd) Snapchat", // b
  "a) True\nb) False", // a
  "a) Facebook\nb) Instagram\nc) Twitter", // b
  "a) True\nb) False", // b
  "a) Weibo\nb) Vkontakte\nc) Ektorp\nd) Renren", // c
  "a) True\nb) False", // a
  "a) Photos\nb) Hashtags\nc) Videos\nd) Other Medias", // b
  "a) BTS\nb) PewDiePie\nc) Ellen DeGeneres\nd) Yusaku Maezawa" // d
];

const answers = ["a", "b", "a", "c", "a", "b", "c", "a", "d", "b", "a", "b", "b", "c", "a", "b", "d"];
let rand = Math.floor(Math.random() * questions.length);

// so the question 0 the options will be the options 0 i added a comment for the correct answer please add more
module.exports = {
  name: "trivia",
  cooldown: 20,
  callback: async (client, message, args, handler) => {

    let data = await database.ref(`Profiles/${message.author.id}`).once('value')
      data = data.val()
      
      if(!data) {
         return channel.send("You don't have an account created")
      } else {
       
    
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
    }}
  },
};
