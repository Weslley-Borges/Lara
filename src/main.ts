import { chatController, commandController, verificationController } from "@systems"
import { groupController } from "@database"
import { bot, messages, prefix, taskLogger } from "@config"
import { send_response } from "@helpers"
import { validate_join_verification, add_join_verification } from "@actions"
import chalk from "chalk"
 

bot.telegram.getMe().then(() => {
  console.log(chalk.cyan(messages.lara_logo+"\n"))
  taskLogger.logStep('⚙️','Init', 'START', `Iniciando em ${process.argv[2]}`)
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

  await validate_join_verification(ctx).then(result => {
    if (!result) return
    send_response(ctx, result)
  })

  const result = ctx.message.text.startsWith(prefix)
    ? await commandController.handle(ctx)
    : await chatController.handle(ctx)
  
  send_response(ctx, result)
})


bot.on('left_chat_member', async ctx => {
  if (ctx.update.message.left_chat_member.id === bot.botInfo?.id && ctx.chat.type != "private") {
    await groupController.delete_one(ctx.chat.id)
    taskLogger.logStep('😢','REMOVED', 'ACTION', "Fui removida de "+ctx.chat.title)
  }
})
bot.on('new_chat_members', ctx => {
  ctx.update.message.new_chat_members.forEach(async new_member => {
    if (ctx.chat.type.includes("group")) {
      if (new_member.id === bot.botInfo?.id) return send_response(ctx, [{text:messages.lara_join}])
      return send_response(ctx, await add_join_verification(ctx))
    }
  })
})

bot.launch({dropPendingUpdates: true})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))