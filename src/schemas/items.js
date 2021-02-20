const mongoose = require('mongoose')

const iten = mongoose.Schema({
  _id: {
    type: String, // string
    required: true // required
  },
  itens: {
      type: [String] // array
  },
  clock: {
    type: Number // String
  }

})

module.exports = mongoose.model('iten', iten)