const telecommunicationsDB = require('../Database/models/telecommunications')
const MessageEmbed = require('discord.js').MessageEmbed
module.exports = async(client, msg, data) => {
   let embed = new MessageEmbed()
   let description = "**Lista de usuarios baneados de la SintNet en tu servidor** ("+data.shadowBans.length+")```-"
   for(let userData of data.shadowBans){
      if(client.users.resolve(userData.guildId) == null){
         continue
      }
      description += " "+client.users.resolve(userData.guildId).username+"\n"
   }
   embed.setDescription(description+'```')
   msg.channel.send(embed)
}