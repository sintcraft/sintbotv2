const config = require('../config.json')
const sha256 = require('sha256')
module.exports = async(client, msg, args) => {
   if(args.length < 1) return msg.channel.send('Falto un mensaje para poder encriptar.')
   if(args[0].startsWith('-') && args.length >= 2 &&!isNaN(parseInt(args[0][1]))) {
      var vueltas = parseInt(args[0][1]);
      args.shift();
      let texto = args.join(' ');
      for(var i = 1; i < vueltas; i++) {
         texto = sha256(texto)
      }
      return msg.channel.send(`Contenido encryptado mediante sha256 con ${vueltas} vueltas:\n ${texto}`)
   }
   msg.channel.send(`Contenido encryptado mediante sha256: ${sha256(args.join(' '))}`)
}