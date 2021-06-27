module.exports = async(client, msg) => {
   let member = msg.mentions.members.first()
   if(!member){
      msg.reply('tienes que mencionar a un candidato. `!propuestas @user`').then((message) =>  {
         setTimeout(function(){
            message.delete()
         }, 3000)
      })
      return
   }
   let mayorData = await require('../Database/models/mayor').findOne({ authorId: member.user.id })
   if(mayorData == null){
      msg.reply(
         member.user.username
         +' no esta postulando para alcalde.'
      ).then((message) =>  {
         setTimeout(function(){
            message.delete()
         }, 3000)
      })
      return
   }
   msg.reply(
      'las propuestas de '
      + member.user.username
      + ' son:\n'
      + mayorData.proposals
   ).then((message) =>  {
      setTimeout(function(){
         message.delete()
      },15000)
   })
}