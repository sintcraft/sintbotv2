const telecommunicationsDB = require('../Database/models/telecommunications')
const sendAll = async(client, msg, data) => {
   let guildId = data.guildId
   let messageSend = "**[" + data.name + "]** "+msg.author.username+" >> "+msg.content
   if(guildId == '0')messageSend = "**=-=-=-= "+data.name+" =-=-=-=**\n **-> ** "+msg.content
   // Logic to send message to all servers, exeption one server
   let serversDb = await telecommunicationsDB.find()
   for(let server of serversDb){
      if(server.guildId == guildId)continue
      if(server.channelId != null){
         let channel = client.channels.resolve(server.channelId)
         if(channel != null){
            channel.send(messageSend)
         }
      }
   }
}
const ifBanOnGuild = async(memberId, guildId) => {
   let status = false
   let data = await telecommunicationsDB.findOne({ guildId })
   for(let userId of data.shadowBans){
      if(userId == memberId){
         status = true;
      }
   }
   return status
}


module.exports = {
   ifBanOnGuild,
   sendAll
}