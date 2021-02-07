require('dotenv').config({ path: './src/private/.env' })
const mongoose = require('mongoose')
let user = null // 'clefory' / 'cannon' / 'bot' / null
if(user == null) user = 'a'
let mongoPath;
let messages = require('../objects/messages.json')
let message = messages.no_mongo


switch(user.toLowerCase()) {

  case 'cannon' :
  console.log("Cannon's DB") 
  mongoPath = process.env.CANNON_DB
  break;

  case 'clefory' :
  console.log("Clefory's DB") 
  mongoPath = process.env.CLEFORY_DB
  break;

  case 'bot' :
  console.log("Bot's DB") 
  mongoPath = process.env.DB
  break;

  default:
  console.log("Default DB") 
  mongoPath = process.env.NO_DB_BUG
  break;

}

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true,
  })
  return mongoose
}
