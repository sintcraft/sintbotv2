const telecommunicationsDB = require('../Database/models/telecommunications')
const MessageEmbed = require('discord.js').MessageEmbed
module.exports = async(client, msg) => {
   let list = await telecommunicationsDB.find()
   let embed = new MessageEmbed()
   let description = "**Lista de servidores de la SintNet** ("+list.length+")```"
   for(let serverData of list){
      if(client.guilds.resolve(serverData.guildId) == null){
         await telecommunicationsDB.deleteOne({ guildId: serverData.guildId })
         continue
      }
      if(serverData.guildId == msg.guild.id){
         description += "\n-> "+serverData.name+''
         continue
      }
      description += "\n- "+serverData.name
   }
   embed.setDescription(description+'```')
   msg.channel.send(embed)
}