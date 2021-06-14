const msgHistory = require('../Database/models/msgHistory')
var client = null

const onMessage = async(msg) => {
   if(client == null)return
   msg.content = msg.content.toLowerCase()
   let palabra = msg.content.replace("(", " ").replace("/", " ").replace("*", " ").split(" ")[0]
   if(!palabra)return
   let package = new msgHistory()
   package.content = palabra
   package.authorId = msg.author.id
   package.timestamp = Date.now()
   await package.save()
}

const resolveHystory = async(form = "asc") => {
   let data = await msgHistory.find().sort({ timestamp: form })
   if(data.length <1)return "Not found"
   let history = ""
   for(let msg of data){
      if(!msg.activaded)continue
      history = history + " " + msg.content
   }
   return history.trim()
}

const setClient = (cliente) => {
   client = cliente
}

module.exports = {
   setClient,
   onMessage,
   resolveHystory,
}