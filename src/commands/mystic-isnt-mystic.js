const economy = require("@utils/economy")

module.exports = {
    name: 'daily',
    description: 'Gives your daily amount of coins.',
    clientPerms: ['EMBED_LINKS'],
    userPerms: ['SEND_MESSAGES'],
    //cooldown: 86400,    smh!
    execute: async (message) => {
        await economy.addCoins(message.guild.id, message.author.id, 100)
        return message.channel.send({ embed: {
            description: 'You have claimed **100** <:coin:809447006783275058> today!',
            color: "BLUE",
            footer: {
                name: 'Come back tomorrow',
                icon_url: message.client.user.displayAvatarURL()
            }
        }})
    }
}