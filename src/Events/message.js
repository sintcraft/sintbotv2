const config = require('../config.json')
const msgHistoryManager = require('../Tools/msgHistoryManager')
const spamManager = require('../Tools/spamManager')
const mayorManager = require('../Tools/mayorManager')
const messageOfOtherGuilsd = require('../modules/onMessageOfGuilds')
const telecommunicationsDB = require('../Database/models/telecommunications')
const { MessageEmbed } = require('discord.js')

// Commands
const history = require('../commands/history')
const exportCmd = require('../commands/export')
const apply = require('../commands/apply')
const vote = require('../commands/vote')
const proposals = require('../commands/proposals')
const list_net = require('../commands/list_net')
const help = require('../commands/help')
const invite = require('../commands/invite')
const shadownBan = require('../commands/shadownBan')
const shadownPardon = require('../commands/shadownPardon')

module.exports = async(client, msg) => {
   if(msg.author.bot || msg.channel.type == 'dm')return
   if(msg.guild.id != config.CuartelGuildId || msg.channel.id == config.telecomunications.cuartelId){
      await messageOfOtherGuilsd(client, msg)
      return
   }
   if(msg.channel.id == config.spamChannel){
      await spamManager.onMessage(msg)
      return
   }
   if(msg.channel.id == config.historyChannel){
      msgHistoryManager.onMessage(msg)
      return
   }
   if(msg.channel.id == config.mayors.channelId){
      mayorManager.onMessage(msg)
   }



   let prefix = config.prefix
   //commands
   if(!msg.content.startsWith(prefix))return
   var args = msg.content.slice(prefix.length).trim().split(/ +/g);
   var cmd = args.shift().toLowerCase();
   if(cmd == 'history' || cmd == 'compilar' || cmd == 'compile'){
      await history(client, msg, args)
   }
   if(cmd == 'export' || cmd == 'exportar'){
      await exportCmd(client, msg)
   }
   if((cmd == 'apply' || cmd == 'postularse' || cmd == 'postular') && msg.channel.id == config.mayors.channelId){
      await apply(client, msg, args)
   }
   if((cmd == 'votar' || cmd == 'vote' || cmd == 'voto') && msg.channel.id == config.mayors.channelId){
      await vote(client, msg, args)
   }
   if((cmd == 'proposals' || cmd == 'propuestas') && msg.channel.id == config.mayors.channelId){
      await proposals(client, msg)
   }
   if(cmd == 'list-net' || cmd == 'list'){
      await list_net(client, msg)
   }
   if(cmd == 'help' || cmd == 'ayuda'){
      await help(msg, { prefix })
   }
   if(cmd == 'invitar' || cmd == 'invite'){
      invite(client, msg)
   }
   if((cmd == 'shadownban' || cmd == 'shadown-ban') && msg.member.hasPermission('ADMINISTRATOR')){
      let member = msg.mentions.members.first()
      await shadownBan(member, msg, await telecommunicationsDB.findOne({ GuildId: config.CuartelGuildId }))
   }
   if((cmd == 'shadownpardon' || cmd == 'shadown-pardon') && msg.member.hasPermission('ADMINISTRATOR')){
      let member = msg.mentions.members.first()
      await shadownPardon(member, msg, await telecommunicationsDB.findOne({ GuildId: config.CuartelGuildId }))
   }
   if(msg.author.id != config.superUser)return
   if(cmd == 'list-guilds'){
      msg.channel.send("Check yours message's")
      let embed = new MessageEmbed()
      let description = '```'
      for(let guild of await telecommunicationsDB.find()){
         description += '\n' + guild.name + ' - ' + guild.guildId
      }
      embed.setDescription(description+'```')
      msg.author.send(embed)
   }
   if(cmd == 'kick-guild'){
      let guildId = args[0]
      setTimeout(function(){ msg.delete() }, 3000)
      if(!guildId)return msg.reply('Falta id: !ban-guild guildId')
      let guildData = await telecommunicationsDB.findOne({ guildId })
      if(guildData == null)return msg.reply('No encontrado')
      if(client.guilds.resolve(guildId) != null){
         client.guilds.resolve(guildId).leave()
      }
      await guildData.delete()
      msg.reply('Eliminado correctamente')
   }
}