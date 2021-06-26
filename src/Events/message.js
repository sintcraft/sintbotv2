const config = require('../config.json')
const msgHistoryManager = require('../Tools/msgHistoryManager')
const mayorManager = require('../Tools/mayorManager')
const messageOfOtherGuilsd = require('../modules/onMessageOfGuilds')

// Commands
const history = require('../commands/history')
const exportCmd = require('../commands/export')
const apply = require('../commands/apply')
const vote = require('../commands/vote')
const proposals = require('../commands/proposals')
const list_net = require('../commands/list_net')
const help = require('../commands/help')
const invite = require('../commands/invite')

module.exports = async(client, msg) => {
   if(msg.author.bot)return
   if(msg.guild.id != config.CuartelGuildId || msg.channel.id == config.telecomunications.cuartelId){
      await messageOfOtherGuilsd(client, msg)
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
}