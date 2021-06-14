const mongoose = require('mongoose')
const palabra = new mongoose.Schema({
   content: String,
   authorId: String,
   activaded: {
      type: Boolean,
      default: true
   },
   timestamp: {
      type: Number,
   }
})
module.exports = mongoose.model('historyChannel', palabra)