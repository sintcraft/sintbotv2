const mongoose = require('mongoose')
const trackingMsg = new mongoose.Schema({
   msgId: {
      type: String,
   },
   channelId: {
      type: String,
   },
   keyName: {
      type: String,
   }
})

module.exports = mongoose.model('trackingMsg', trackingMsg)