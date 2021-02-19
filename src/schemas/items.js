const mongoose = require('mongoose')

const post = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  items: {
      type: [String]
  }

})

module.exports = mongoose.model('post', post)