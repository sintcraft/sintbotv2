const mayorManager = require('../Tools/mayorManager')
const votesDB  = require('../Database/models/votes')
const mayorDB = require('../Database/models/mayor')
const message = require('../Events/message')

module.exports = async(client, msg, args) => {
   let user = msg.author
   let data = await votesDB.findOne({ voter: user.id })
   let mention = msg.mentions.members.first()
   if(data !=  null && args[0] == 'nulo'){
      await data.delete()
      msg.reply(
         'Ahora tu voto es nulo, recuerda que votar es lo mejor, o no? :face_with_raised_eyebrow:'
      ).then((message) =>  {
         setTimeout(function(){
            message.delete()
         }, 3500)
      })
      await mayorManager.updateVotes()
      return
   }
   if(data == null && !mention){
      msg.channel.send('Para votar por alguien tienes que usar `!votar @user` importante mencionar al usuario')
      .then((message) =>  {
         setTimeout(function(){
            message.delete()
         }, 3500)
      })
   }else if(data ==  null){
      let mayor = await mayorDB.findOne({ authorId: mention.user.id })
      if(mayor == null){
         msg.reply(
            mention.user.username
            + ' no esta postulando a la alcaldia. :pleading_face:'
         ).then((message) =>  {
            setTimeout(function(){
               message.delete()
            }, 2500)
         })
         return
      }
      await new votesDB({
         voter: user.id,
         mayor: mention.user.id
      }).save()
      await mayorManager.updateVotes()
      msg.channel.send(
         'Tu voto fue dado a '
         + mention.user.username
         + ', espero te agraden sus propuestas. :wink:'
      ).then((message) =>  {
         setTimeout(function(){
            message.delete()
         }, 3000)
      })
   }else if(!mention){
      if(!client.users.resolve(data.mayor))return
      msg.reply(
         'Actualmente tu voto es para **'
         + client.users.resolve(data.mayor).username
         + '**.\n\nSi quieres anular tu voto puedes poner `!votar nulo`'
      ).then((message) =>  {
         setTimeout(function(){
            message.delete()
         }, 4000)
      })
   }else{
      let mayor = await mayorDB.findOne({ authorId: mention.user.id })
      if(mayor == null){
         msg.reply(
            mention.user.username
            + ' no esta postulando a la alcaldia. :pleading_face:'
         ).then((message) =>  {
            setTimeout(function(){
               message.delete()
            }, 3000)
         })
         return
      }
      msg.reply(
         'Ahora tu voto va para '
         + mention.user.username
         + ' :relieved:'
      ).then((message) =>  {
         setTimeout(function(){
         message.delete()
      }, 3000)
      })
      data.mayor = mention.user.id
      await data.save()
      await mayorManager.updateVotes()
   }
   //Logic to add vote, validated vote with the function mayorManager.validVote()
}