const telecommunicationsDB = require('../Database/models/telecommunications')
const telecomunicationsManager = require('../Tools/telecomunicationsManager')
module.exports = async(member, msg, data) => {
   if(!member)return msg.reply(`**Uso:** ${data.prefix}shadown-pardon <@user> (Importante taguear al usuario)`)
   if(!await telecomunicationsManager.ifBanOnGuild(member.user.id, msg.guild.id))return msg.reply(`**${member.user.username}** no esta baneado.`)
   let serverData = await telecommunicationsDB.findOne({ guildId: msg.guild.id })
   let pos = serverData.shadowBans.indexOf(member.user.id)
   if(pos<0)return msg.reply('Algo fallo')
   serverData.shadowBans.splice(pos, 1)
   await serverData.save()
   msg.reply('se perdono a **'
               +member.user.username
               +'** correctamente de la SintNet.')
}