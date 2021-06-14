const mongoose = require('mongoose')
const mayor = new mongoose.Schema({
   authorId: {
      type: String,
   },
   propuestas: {
      type: String,
      default: ""
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