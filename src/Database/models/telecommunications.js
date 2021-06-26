const mongoose = require('mongoose')
const Schema = mongoose.Schema({
   guildId: {
      type: String
   },
   prefix: {
      type: String,
      default: '!',
   },
   name: {
      type: String,
   },
   channelId: {
      type: String,
      default: null,
   },
   shadowBans: {
      type: Array,
      default: []
   }
})
module.exports = mongoose.model('telecomminications', Schema)