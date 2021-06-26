const config = require('../config.json')
const MessageEmbed = require('discord.js').MessageEmbed
module.exports = async(msg, data) => {
   let embed = new MessageEmbed()
   embed.setTitle('Ayuda de SintBot')
   embed.setColor('#e0ffff')
   embed.setTimestamp(Date.now())
   embed.setDescription(config.telecomunications.descriptionHelpCommand.split("%prefix%").join(data.prefix))
   msg.channel.send(embed)
}