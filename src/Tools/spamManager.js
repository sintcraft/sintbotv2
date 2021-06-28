const onMessage = async(msg) => {
   msg.reply('Tu mensaje sera eliminado dento de `24h`').then(msgBot => {
      setTimeout(function(){
         msgBot.delete()
      }, 6000)
   })
   setTimeout(
      function(){
         msg.delete()
      },
      60*60*23*1000
   )
}
module.exports = {
   onMessage,
}