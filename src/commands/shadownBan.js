const telecommunicationsDB = require('../Database/models/telecommunications')
const telecomunicationsManager = require('../Tools/telecomunicationsManager')
module.exports = async(member, msg, data) => {
   if(!member)return msg.reply(`**Uso:** ${data.prefix}shadown-ban <@user> (Importante taguear al usuario)`)
   if(await telecomunicationsManager.ifBanOnGuild(member.user.id, msg.guild.id))return msg.reply(`${member.user.username} ya esta baneado/a.`)
   data.shadowBans.push(member.id)
   await data.save()
   msg.reply('se baneo a **'
               +member.user.username
               +'** correctamente de la SintNet.')
}