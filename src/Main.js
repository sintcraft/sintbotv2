require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

var archivo

client.on('ready', () => {
    console.log('Bot listo!')
})

client.on('message', (msg) => {
    if(msg.author.id == client.user.id)return
    archivo = fs.readFileSync('src/history.txt', {encoding: 'utf-8'})
    if(msg.channel.id == '780794467341828099'){
        if(msg.content[0]=='(')return
        let mensaje = msg.content.split(' ')
        mensaje = mensaje[0].split('(')
        archivo = archivo + " " + mensaje[0]
        fs.writeFileSync('src/history.txt', archivo, { encoding:'utf-8' })
        return
    }
    msg.content = msg.content.toLowerCase()
    let args = msg.content.split(' ')
    let cmd = args.shift()
    if(cmd == '!compilar' || cmd == '!compile'){
        if(args.length>0 && args[0]=='-d'){
            let compilado = ""
            for(let i = 0; i < archivo.split(' ').length; i++){
                compilado = compilado + "(" + i + ")" + archivo.split(' ')[i] + " "
            }
            msg.channel.send(compilado)
        }else{
            msg.channel.send(archivo)
        }
    }
    if(cmd == '!export' || cmd == '!exportar'){
        let attachment = new Discord.MessageAttachment('src/history.txt')
        msg.channel.send(attachment)
    }
    if(msg.author.id != '747267711851167846')return
    if(cmd == '!remove'){
        if(!args.length>0)return msg.channel.send('Cual? `!remove 1`')
        let partido = archivo.split(' ')
        let eliminado = partido.splice(parseInt(args[0]), 1)
        partido = partido.join(' ')
        fs.writeFileSync('src/history.txt', partido, { encoding:'utf-8' })
        msg.channel.send('Palabra eliminada correctamente!, `' + eliminado[0] + '`')
    }
})

client.login(process.env.discordToken)