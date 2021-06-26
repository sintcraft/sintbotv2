const config = require('../config.json')
const MessageEmbed = require('discord.js').MessageEmbed
module.exports = async(client, msg) => {
   let embed = new MessageEmbed()
   embed.setTitle('Invitacion')
   embed.setColor('#ff8000')
   embed.setThumbnail(client.user.displayAvatarURL())
   embed.setDescription('Cuando invites a Sintbot, usa !help para ayuda con los comandos.'
                        + '\nUnete a la SintNet [da click aquí](https://discord.com/api/oauth2/authorize?client_id=765417813221048340&permissions=52241&scope=bot)')
   msg.channel.send(embed)
}