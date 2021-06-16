const mongoose = require('mongoose')
const votes = mongoose.Schema({
   voter: {
      type: String
   },
   mayor: {
      type: String
   }
})
module.exports = mongoose.model('votes',  votes)