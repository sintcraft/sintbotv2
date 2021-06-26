const telecommunicationsDB = require('../Database/models/telecommunications')
const telecomunicationsManager = require('../Tools/telecomunicationsManager')
const config = require('../config.json')
const MessageEmbed = require('discord.js').MessageEmbed
//Commands
const list_net = require('../commands/list_net')
const help = require('../commands/help')
const invite = require('../commands/invite')

module.exports = async(client, msg) => {
   let data = await telecommunicationsDB.findOne({ guildId: msg.guild.id })
   if(data == null){
      await new telecommunicationsDB({
         guildId: msg.guild.id,
         name: msg.guild.name
      }).save()
      data = await telecommunicationsDB.findOne({ guildId: msg.guild.id })
   }
   let prefix = data.prefix
   //commands
   if(msg.channel.id == data.channelId){
      // Logic to send message in channel of telecomunicactions
      if(await telecomunicationsManager.ifBanOnGuild(msg.author.id, msg.guild.id))return
      await telecomunicationsManager.sendAll(client, msg, data)
      return
   }
   if(msg.guild.id == config.CuartelGuildId)return
   if(msg.content == '!help' || msg.content == '!ayuda' || msg.content == prefix+'help'){
      await help(msg, data)
   }
   if(!msg.content.startsWith(prefix))return
   var args = msg.content.slice(prefix.length).trim().split(/ +/g);
   var cmd = args.shift().toLowerCase();
   if(cmd == 'setup' && msg.member.hasPermission('ADMINISTRATOR')){
      if(!msg.guild.me.hasPermission('MANAGE_CHANNELS'))return msg.channel.send(':x:**No tengo permisos de crear canales.**')
      msg.guild.channels.create(config.telecomunications.defaultName, {
         type: 'text'
      }).then(async(channel) => {
         data.channelId = channel.id
         await data.save()
         msg.reply('Listo ahora el nuevo canal de telecomunicaciones es <#'
                     +channel.id
                     +'> el nombre publico del servidor para la SintNet es '
                     +data.name
                     +' puedes cambiarlo con `'
                     +prefix
                     +'setname <nuevo nombre> `')
      })
   }
   if(cmd == 'setprefix' && msg.member.hasPermission('ADMINISTRATOR')){
      if(!args[0])return msg.channel.send(':x: **Uso:** '+data.prefix+'setprefix <new_prefix>')
      data.prefix = args[0]
      await data.save()
      msg.channel.send(':white_check_mark: **Listo** Ahora tu nuevo prefix es `'+args[0]+'`')
   }
   if(cmd == 'setnombre' || cmd == 'setname'){
      if(!args[0])return msg.channel.send(':x: **Uso:** '+data.prefix+'setname <nuevo nombre>')
      data.name = args.join(' ')
      await data.save()
      msg.channel.send(':white_check_mark: **Listo** Ahora el nuevo nombre publico del servidor en la SintNet es **'
                        + data.name
                        +'**')
   }
   if(cmd == 'list-net' || cmd == 'list'){
      await list_net(client, msg)
   }
   if(cmd == 'invitar' || cmd == 'invite'){
      invite(client, msg)
   }
}