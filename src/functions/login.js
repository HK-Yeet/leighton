require('dotenv').config({ path: './src/private/.env' })
const support = require('../private/config.json')
const { Client } = require("discord.js");
const client = new Client(); 
const { HKandler } = require("hkutilities");
const { prefix, owners } = require('../private/config.json')
let tok = 'a'


let dirs = {
  commandsDir: "src/commands",
  eventsDir: "src/events",
  featuresDir: "src/features",
};

const connect = (param = 'Empty') => {
    switch(param.toLowerCase()) {
      case 'bot' :
        tok = support.token || process.env.TOKEN
        console.log(`Bot is active`)
        break;
        
  
        case 'cannon' : 
        tok = process.env.CANNON
        console.log(`Cannon is active`)
        break;
  
        case 'hk' : 
        tok = process.env.HK
        console.log(`HK is active`)
        break;
  
        case 'bqre' : 
        tok = process.env.BQRE
        console.log(`Bqre is active`)
        break;
  
        case 'clefory' : 
        tok = process.env.CLEFORY
        console.log(`Clefory is active`)
        break;
  
        default :
        tok = support.token || process.env.TOKEN // same has bot
        console.log(`Bot is active by default`)
        break;
  
        /*save your tokens in .env to test this bot 
        don't forget to add your name to the function and to .env*/
    }

    new HKandler(client, dirs)
    .setPrefix(prefix)
    .setOwners(owners)
    .setDefaultCooldown(2) //5 is default 
    // NOTE FROM CANNON: i changed cooldown of 3 to 2
    .setHelpDescription("Imagine needing help lmao");


    client.login(tok).catch((err) => console.log('\x1b[31mAre you sure you put your name in index.js?\x1b[0m   \n' + err))
    

    client.on('ready', async () => {
      let mongo = require('../functions/mongo')
      if(!mongo) return console.log(require('../objects/messages.json').no_mongo)

        await mongo().then(async (mongoose) => {
            console.log('Connected to Mongodb')
            }).catch(() => console.log(require('../objects/messages.json').no_mongo))
            // IMPORTANT NOTE! NEVER DISCONNECT OR CONNECT AGAIN TO MONGODB        
  })
}
module.exports = connect

