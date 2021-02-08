const mongoose = require('mongoose')

const afk = mongoose.Schema({

  _id: {
    type: String,
    required: true,
  },

  afk_servers: {
    type: [String],
  },

  afk_reasons: {
    type: [String],
  },

  afk_old_names: {
    type: [String],
  },

  afk_date: {
    type: [String],
  },


})

module.exports = mongoose.model('afk', afk)