import { chatController, commandController, verificationController } from '@services'
import { groupController } from '@database'
import { messages, prefix, taskLogger, connect_mongo } from '@config'
import { send_response } from '@helpers'
import { Telegraf } from 'telegraf'
import chalk from 'chalk'
 

export const bot = ((): Telegraf => {
  console.clear()
  console.log(chalk.cyan(messages.lara_logo))
  console.log(
    '[+] V0.0.3 Alpha - \'POOling\'\n'+
    '[+] by Weslley Borges\n')
  connect_mongo()
  
  return process.argv[2] === 'test' 
    ? new Telegraf(String(process.env.BOT_TOKEN_TEST))
    : new Telegraf(String(process.env.BOT_TOKEN))
})()


bot.telegram.getMe().then(() => {
  taskLogger.log_step('⚙️','Init', 'END', `Lara Iniciada em ${process.argv[2]}`)
})

bot.start(ctx => send_response(ctx,[{text: messages.lara_start}]))


bot.use(async (ctx, next) => {
  if (ctx.updateType === 'message') {
    const verification = await verificationController.handle(ctx)
    if (verification.malicious) return send_response(ctx, verification.messages)
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
  if (ctx.chat.type === 'private') return
  const member = ctx.update.message.left_chat_member

  if (member.id === bot.botInfo?.id) {
    await groupController.delete_one(ctx.chat.id)
    taskLogger.log_step('😢','REMOVED', 'ACTION', `Fui removida de ${ctx.chat.title} (${ctx.chat.id})`)

  } else if (member.is_bot)
    return send_response(ctx, [{text: 'Pronto, menos concorrência.'}])
})

bot.on('new_chat_members', ctx => {
  ctx.update.message.new_chat_members.forEach(async new_member => {
    if (!ctx.chat.type.includes('group')) return
    if (new_member.id !== bot.botInfo?.id) return
    
    groupController.register_group(ctx.chat.id)
    send_response(ctx, [{text:messages.lara_join}])
  })
})

bot.launch({dropPendingUpdates: true})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))