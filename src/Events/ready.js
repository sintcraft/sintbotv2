const DB = require('../Database/connection')
module.exports  = async(client) => {
   console.log('Bot listo')
   await DB()
   require('../Tools/msgHistoryManager').setClient(client)
   require('../Tools/mayorManager').setUp(client)
}