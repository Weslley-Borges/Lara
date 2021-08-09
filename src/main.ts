import { bot, taskLogger } from "@config"
import { send_response } from "@helpers"
import mongoose from "mongoose"


bot.telegram.getMe().then(() => {
  taskLogger.logStep('⚙️','Init', 'START', `Iniciando o bot de ${process.argv[2]}`)
  
  try {
    taskLogger.logStep('⚙️','Services', 'START', 'Iniciando serviços...')
    mongoose.connect(process.argv[3])
    taskLogger.logStep('✅','Services', 'END', 'Serviços iniciados com sucesso!')
    taskLogger.logStep('✅','Init', 'END', 'Lara iniciada com sucesso!')

  } catch(e) {
    taskLogger.logStep('❌','Services', 'ERROR', 'Erro ao iniciar serviços!')
  }
})

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