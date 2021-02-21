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
    type: Number // Number 
    // Didn't have time to do this
  }

})

module.exports = mongoose.model('iten', iten)