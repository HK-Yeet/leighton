const mongoose = require('mongoose')

const post = mongoose.Schema({

  name: {
    type: String,
  },
  _id: {
    type: String,
  },
  post: {
      type: [String]
  }

})

module.exports = mongoose.model('post', post)