const mongoose = require('mongoose')
const mayor = new mongoose.Schema({
   authorId: {
      type: String,
   },
   proposals: {
      type: String,
      default: require('../../config.json').mayors.proposalsDefault
   },
   votes: {
      type: Number,
      default: 0,
   },
   timestamp: {
      type: Number,
   },
})

module.exports = mongoose.model('mayors', mayor)