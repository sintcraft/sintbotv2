require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client()

// Register events
for(let event of fs.readdirSync(__dirname+'/Events/', { encoding: 'utf-8' })){
  if(!event.endsWith('.js'))return
  event = event.substring(0, event.length - 3)
  let Runner = require(__dirname+'/Events/'+event)
  client.on(event, Runner.bind(null, client))
  delete require.cache[require.resolve('./Events/'+event)];
}
/*client.on('message', (msg) =>{
  
})*/

//Login discord
client.login(process.env.discordToken)