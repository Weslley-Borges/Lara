import { chatController, commandController, verificationController } from "@systems"
import { bot, messages, prefix, taskLogger } from "@config"
import { send_response } from "@helpers"
import chalk from "chalk"
 

bot.telegram.getMe().then(() => {
  console.log(chalk.cyan(messages.lara_logo+"\n"))
  taskLogger.logStep('⚙️','Init', 'START', `Iniciando o bot de ${process.argv[2]}`)
  taskLogger.logStep('✅','Init', 'END', 'Lara iniciada com sucesso!')
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