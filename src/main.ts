import { bot, prefix, taskLogger } from "@config"
import { send_response } from "@helpers"
import { chatController, commandController, verificationController } from "@systems"
import mongoose from "mongoose"
 

bot.telegram.getMe().then(() => {
  taskLogger.logStep('⚙️','Init', 'START', `Iniciando o bot de ${process.argv[2]}`)
  
  try {
    taskLogger.logStep('⚙️','Services', 'START', 'Iniciando serviços...')
    mongoose.connect(process.argv[3], {useNewUrlParser:true,useUnifiedTopology:true})
    taskLogger.logStep('✅','Services', 'END', 'Serviços iniciados com sucesso!')
    taskLogger.logStep('✅','Init', 'END', 'Lara iniciada com sucesso!')

  } catch(e) { taskLogger.logStep('❌','Services', 'ERROR', 'Erro ao iniciar serviços!') }
})

bot.start(ctx => {
  send_response(ctx,[{
    text: 
      `<b>Oi! Eu me chamo Lara</b>\n`+
      `Eu sou um bot criado para fornecer serviços\n\n`+
      `Digite <b><i>!menu</i></b> para ver os meus comandos!`
  }])
})

bot.on('text', async ctx => {
  const verification = await verificationController.handle(ctx)
  if (verification.malicious) return send_response(ctx, verification.messages)

  const result = ctx.message.text.startsWith(prefix)
    ? await commandController.handle(ctx)
    : await chatController.handle(ctx)
  
  return send_response(ctx, result)
})


bot.launch({dropPendingUpdates: true})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))