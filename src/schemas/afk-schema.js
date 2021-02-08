const mongoose = require('mongoose')

const afk = mongoose.Schema({
  // User ID
  _id: {
    type: String,
    required: true,
  },

  server: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },


})

module.exports = mongoose.model('afk', afk)