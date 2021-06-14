const mongoose = require('mongoose')
module.exports = async() => {
   await mongoose.connect(
      process.env.DBURI,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }
   ).then(() => {
      console.log('[DB] connected!')
      return true
   })
   .catch((err)=>{
      console.log(`[DB] don't connection`, err)
      process.exit()
   })
}