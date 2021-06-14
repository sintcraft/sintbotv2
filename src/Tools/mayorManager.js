const mayor = require('../Database/models/mayor')
const trackingMsg = require('../Database/models/trackingMsg')
const config = require('../config.json')
const { MessageEmbed } = require('discord.js')
var client = null

const setUp = async(cliente) => {
   client = cliente
   let mayorListMsg = await trackingMsg.findOne({ keyName: 'mayorList' })
   if(mayorListMsg == null){
      let channel = client.channels.resolve(config.alcaldia.channelId)
      let embed = new MessageEmbed()
      embed.setColor('#efb810')
      embed.setDescription(config.alcaldia.msgPreList+'- sint```')
      channel.send(embed).then(async(msg) => {
         await new trackingMsg({
            channelId: config.alcaldia.channelId,
            msgId: msg.id,
            keyName: 'mayorList',
         }).save()
      })
   }else{
      // Logic to verify exists message and list all postulates of mayors in the database
   }
}

const addMayor = async() => {
   // Logic to verify exists a postulate of mayor and proposals of he's
}

const validVote = async() => {
   // Logic to verify vote valid or not valid from the schema
}

module.exports = {
   setUp,
   addMayor,
   validVote,
}