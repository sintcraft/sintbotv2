const mayorDB = require('../Database/models/mayor')
const config = require('../config.json')
const mayorManager = require('../Tools/mayorManager')
module.exports = async(client, msg, args) => {
   let user = msg.author
   let proposals = args.join(' ')
   let data = await mayorDB.findOne({ authorId: user.id })
   if(data == null){
      let candidate =  new mayorDB({
         authorId: user.id,
         timestamp: Date.now()
      })
      if(args.length > 0) candidate.proposals = proposals
      await candidate.save().then(() => {
         msg.reply(config.mayors.successfullyApplyMsg).then((message)  => {
            setTimeout(function(){
               message.delete()
            }, 5000)
         })
      })
      mayorManager.updateDescription()
   }else{
      if(args.length > 0){
         data.proposals = proposals
      }
      await data.save()
      msg.reply(config.mayors.successfullyApplyMsg).then((message)  => {
         setTimeout(function(){
            message.delete()
         }, 5000)
      })
      mayorManager.updateDescription()
   }
}