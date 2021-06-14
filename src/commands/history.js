const msgHistoryManager = require('../Tools/msgHistoryManager')
module.exports = async(client, msg, args) => {
   if(args[0] == 'reverse' || args[0] == '-r'){
      msg.channel.send(await msgHistoryManager.resolveHystory('desc'))
   } else if(args[0] == '-d'){
      let data = await msgHistoryManager.resolveHystory()
      data = data.split(" ")
      let i = 0
      let compiled = ""
      for(let plb of data){
         compiled = `${compiled} (${i})${plb}`
         i++
      }
      msg.channel.send(compiled)
   }else{
      msg.channel.send(await msgHistoryManager.resolveHystory())
   }
}