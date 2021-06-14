const config = require('../config.json')
const Discord =  require('discord.js')
const msgHistoryManager = require('../Tools/msgHistoryManager')

// Commands
const history = require('../commands/history')
const exportCmd = require('../commands/export')

module.exports = async(client, msg) => {
   if(msg.author.bot)return
   msg.content = msg.content.toLowerCase()
   if(msg.guild.id != config.CuartelGuildId)return

   if(msg.channel.id == config.historyChannel){
      msgHistoryManager.onMessage(msg)
      return
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
}