import { bot } from "./config"
import { send_response } from "./helpers"


bot.start(ctx => {
  send_response(ctx,[{
    text: 
      `<b>Oi! Eu me chamo Lara</b>\n`+
      `Eu sou um bot criado para fornecer serviços\n\n`+
      `Digite <b><i>!menu</i></b> para ver os meus comandos!`,
    markup:{inline_keyboard:[[{text:"Grupo de Suporte", url:"https://t.me/joinchat/ze1_02sqjKowN2Nh"}]]}
  }])
})

bot.launch({dropPendingUpdates: true})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))