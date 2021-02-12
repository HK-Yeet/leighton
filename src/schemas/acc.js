const mongoose = require('mongoose')

const acc = mongoose.Schema({

  name: {
    type: [String],
    required: true,
  },
  find: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('acc', acc)