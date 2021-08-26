import { chatController, commandController, verificationController } from "@services"
import { groupController, joiningController } from "@database"
import { bot, messages, prefix, taskLogger } from "@config"
import { send_response } from "@helpers"
 

bot.telegram.getMe().then(async () => {
  taskLogger.logStep('⚙️','Init', 'END', `Lara Iniciada em ${process.argv[2]}`)
})

bot.start(ctx => send_response(ctx,[{text: messages.start_lara}]))


bot.use(async (ctx, next) => {
  if (ctx.updateType == "message") {
    const verification = await verificationController.handle(ctx)
    if (verification.malicious) return send_response(ctx, verification.messages)
    await joiningController.validate(ctx).then(result => {if (result) send_response(ctx, result)})
  }
  next()
})

bot.on('text', async ctx => {
  send_response(ctx, ctx.message.text.startsWith(prefix)
    ? await commandController.handle(ctx)
    : await chatController.handle(ctx)
  )
})


bot.on('left_chat_member', async ctx => {
  if (ctx.chat.type === "private") return
  const member = ctx.update.message.left_chat_member

  if (member.id === bot.botInfo?.id) {
    await groupController.delete_one(ctx.chat.id)
    taskLogger.logStep('😢','REMOVED', 'ACTION', `Fui removida de ${ctx.chat.title} (${ctx.chat.id})`)

  } else if (member.is_bot)
    return send_response(ctx, [{text: "Pronto, menos concorrência."}])
})

bot.on('new_chat_members', ctx => {
  ctx.update.message.new_chat_members.forEach(async new_member => {
    if (!ctx.chat.type.includes("group")) return

    if (new_member.id !== bot.botInfo?.id) 
      return send_response(ctx, await joiningController.create(ctx))
    
    await groupController.insert_one(ctx.chat.id)
    return send_response(ctx, [{text:messages.lara_join}])
  })
})

bot.launch({dropPendingUpdates: true})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))