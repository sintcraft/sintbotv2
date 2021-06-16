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
      let embed = new MessageEmbed()
      embed.setColor('#efb810')
      embed.setDescription(config.mayors.msgPreList+await getListMayors())
      let msg = await channel.messages.fetch(mayorListMsg.msgId)
                     .catch(async() => {
                        channel.send(embed).then(async(mesg) => {
                           mayorListMsg.msgId = mesg.id
                           await mayorListMsg.save()
                           return mesg
                        })
                     })
      msg.edit(embed)
   }
   // Logic to verify exists message and list all postulates of mayors in the database
}

const updateDescription = async() => {
   let mayorListMsg = await trackingMsg.findOne({ keyName: 'mayorList' })
   channel = client.channels.resolve(config.mayors.channelId)
   let embed = new MessageEmbed()
   embed.setColor('#efb810')
   embed.setDescription(config.mayors.msgPreList+await getListMayors())
   let msg = await channel.messages.fetch(mayorListMsg.msgId)
                  .catch(async() => {
                     channel.send(embed).then(async(mesg) => {
                        mayorListMsg.msgId = mesg.id
                        await mayorListMsg.save()
                        return mesg
                     })
                  })
   msg.edit(embed)
   // Logic to verify exists a postulate of mayor and proposals of he's
}

const updateVotes = async() => {
   let mayorsData = await mayor.find()
   for(let i=0; i < mayorsData.length; i++){
      let user = mayorsData[i]
      let votesData = await require('../Database/models/votes').find({ mayor: user.authorId })
      let mayorData = await mayor.findOne({ authorId: user.authorId })
      mayorData.votes = votesData.length
      await mayorData.save()
   }
   await updateDescription()
}

const getListMayors = async() => {
   let data = await mayor.find().sort({ timestamp: 'asc' })
   let list = ''
   for(let user of data) {
      if(client.users.resolve(user.authorId)){
         list = list + `- ${client.users.resolve(user.authorId).username} - votos ${user.votes}\n`
      }
   }
   list = list + '```'
   return list
   // Logic to list all mayors of the database and return list style for the embed message. CHECK
}

const onMessage = async(msg) => {
   // Logic to message event on this channel
   setTimeout(function(){
      msg.delete()
   }, 3000)
}

module.exports = {
   setUp,
   updateDescription,
   onMessage,
   updateVotes,
}