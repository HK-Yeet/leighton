const { DiscordAPIError, MessageEmbed } = require("discord.js");
//we'll need mongodb after

let questions = {
  0: "The majority of teens use Facebook", 
  1: "What's the most followed Instagram account?",
  2: "What's the most subscribed YouTube channel?",
  3: "After Google, what is the second most popular website in the world?",
  4: "Which platform has a higher rate of engagement?",
  5: "What platform is the best at driving leads?",
}

let options = {
  0: "a True \nb False", // a yes, is true
  1: "a @cristiano \nb @instagram \nc @arianagrande", // b
  2: "a T-Series \nb PewDiePie \nc Cocomelon - Nursery Rhymes", // a
  3: "a Instagram \nb Twitter \nc Youtube", // c
  4: "a Instagram \nb Facebook", // a
  5: "a Twitter \nb Linkdln \nc Facebook" //b
}

// so the question 0 the options will be the options 0 i added a comment for the correct answer please add more
module.exports = {
    name: "trivia",
    cooldown: 20, 
    callback: async (client, msg, args, handler) => {

      
      
      let embed = new MessageEmbed()
      .setTitle(0)


      msg.channel.send(embed)


    },
  };
  