const axios = require('axios')

module.exports = {
    name: "vote",
    category: 'Important',
    description: 'Vote for Leighton in the WOK Competition!',
    cooldown: 60 * 60,
    clientPerms: ["SEND_MESSAGES"],
    callback: async (bot, message, args, hkandler) => {
        const url = `https://wornoffkeys.com/api/competition/voting?userId=${message.author.id}&teamId=leighton`

        axios.post(url).then(({ data }) => {
            if (data.success) message.reply('Successfully voted for Leighton!\nThank you for your vote, we try our best :)')
        }).catch(err => {
            if (err.response.data) {
                const { message: text } = err.response.data
                console.error(text)
                message.reply(text)
                return
            }
            console.error(err)
        })
    }
}