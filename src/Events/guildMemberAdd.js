const config = require('../config.json')
module.exports = async(client, member) => {
   if(member.guild.id != config.CuartelGuildId)return
   let channel = await member.guild.channels.create(config.welcome.layout.replace("%number%", member.guild.memberCount), {
      type: "text",
      permissionOverwrites: [
         {
            id: member.user.id,
            allow: config.welcome.permissions.allow
         },
         {
            id: member.guild.id,
            deny: config.welcome.permissions.deny
         }
      ]
   })
   if(!channel)return member.roles.add(config.welcome.afterRoleId)
   channel.setParent(config.welcome.categoryId, { lockPermissions: false })
   let timeout = 0
   let roles = []
   for(let msg of config.welcome.messages) {
      timeout = timeout + msg.timeOut
      setTimeout(async() => {
         if(msg.type == 'img'){
            channel.send({
               files: [
                  "./resources/" + msg.data
               ]
            })
         }else if(msg.type == 'txt'){
            channel.send(msg.data.split('%user%').join(`<@${member.user.id}>`))            
         }else if(msg.type == 'role'){
            member.roles.add(msg.data)
            roles.push(msg.data)
         }else if(msg.type == 'end'){
            member.roles.add(config.welcome.afterRoleId)
            member.roles.remove(config.welcome.beforeRoleId)
            for(let role of roles){
               member.roles.remove(role)
            }
            channel.delete()
         }
      }, timeout)
   }
}