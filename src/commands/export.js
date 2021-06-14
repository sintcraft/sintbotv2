const msgHistoryManager = require('../Tools/msgHistoryManager')
const fs = require('fs')
const { MessageAttachment } = require('discord.js')

module.exports = async(client, msg) => {
   let history = await msgHistoryManager.resolveHystory()
   history = `Historia exportada - ${new Date()}:\n${history}`
   await fs.writeFileSync('./resources/history.txt', history, { encoding: 'utf-8' })
   msg.channel.send({
      files: [
         "./resources/history.txt"
      ]
   })
}