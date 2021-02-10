require('dotenv').config({ path: './src/private/.env' })
const mongoose = require('mongoose')

const mongoConnect = async user => {

  let key;
  let name;

  switch (user.toLowerCase()) {

    case 'cannon':
      key = process.env.CANNON_DB
      name = "Cannon's"
      break;
  

  case 'clefory':
    key = process.env.CLEFORY_DB
    name = "Clefory's"
    break;

    default:
      key = process.env.DB
      name = "Bot's"
      break;

  }

  await mongoose.connect(key, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true,
  })

  console.log(`Connected to ${name} mongoDB`)

}

module.exports = mongoConnect