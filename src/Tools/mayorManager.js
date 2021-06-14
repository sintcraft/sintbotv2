const mayor = require('../Database/models/mayor')
const trackingMsg = require('../Database/models/trackingMsg')
const config = require('../config.json')
const { MessageEmbed } = require('discord.js')
var client = null

const setUp = async(cliente) => {
   client = cliente
   let mayorListMsg = await trackingMsg.findOne({ keyName: 'mayorList' })
   if(mayorListMsg == null){
      let channel = client.channels.resolve(config.mayors.channelId)
      let embed = new MessageEmbed()
      embed.setColor('#efb810')
      embed.setDescription(config.mayors.msgPreList+'- ```')
      channel.send(embed).then(async(msg) => {
         await new trackingMsg({
            channelId: config.mayors.channelId,
            msgId: msg.id,
            keyName: 'mayorList',
         }).save()
      })
   }else{
      let channel = client.channels.resolve(config.mayors.channelId)
      let msg = await channel.messages.fetch(mayorListMsg.msgId)
                     .catch(async() => {
                        let embed = new MessageEmbed()
                        embed.setColor('#efb810')
                        embed.setDescription(config.mayors.msgPreList+'- ```')
                        channel.send(embed).then(async(mesg) => {
                           mayorListMsg.msgId = mesg.id
                           await mayorListMsg.save()
                        })
                     })
      console.log(channel, msg)
      // Logic to verify exists message and list all postulates of mayors in the database
   }
}

const addMayor = async() => {
   // Logic to verify exists a postulate of mayor and proposals of he's
}

const validVote = async() => {
   // Logic to verify vote valid or not valid from the schema
}

const getListMayors = async() => {
   // Logic to list all mayors of the database and return list style
}

module.exports = {
   setUp,
   addMayor,
   validVote,
}