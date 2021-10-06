import { chatController, commandController } from '@services'
import { messages, prefix, taskLogger } from '@config'
import { groupService } from '@database'
import { send_response } from '@helpers'
import { Bot, GrammyError, HttpError } from 'grammy'


export const actions = (bot: Bot) => {
  bot.use(async (ctx, next) => {
    console.time('Processing time')
    await next()
    console.timeEnd('Processing time')
  })

  bot.catch((err) => {
    const ctx = err.ctx
    console.error(`Error while handling update ${ctx.update.update_id}:`)
    const e = err.error

    if (e instanceof GrammyError) console.error('Error in request:', e.description)
    else if (e instanceof HttpError) console.error('Could not contact Telegram:', e)
    else console.error('Unknown error:', e)
  })

  bot.on('message:text', async ctx => {
    ctx.message?.text.startsWith(prefix)
      ? await commandController.handle(ctx)
      : await chatController.handle(ctx)
  })

  bot.on('message:left_chat_member:me', async ctx => {
    if (ctx.chat.type === 'channel' || ctx.chat.type === 'private') return
    await groupService.delete_one(ctx.chat.id)
    taskLogger.log_step('😢','REMOVED', 'ACTION', `Fui removida de ${ctx.chat.title} (${ctx.chat.id})`)
  })

  bot.on('message:new_chat_members:me', async ctx => { 
    if (ctx.chat.type.includes('group'))
      await groupService.register_group(ctx.chat.id).then(() => send_response(ctx, [{text:messages.lara_join}]))
  })
  bot.on('message:new_chat_members', async ctx => {
    if (!ctx.chat.type.includes('group')) return

    const member = ctx.update.chat_member?.new_chat_member.user
    if (member?.is_bot) return
    await groupService.add_new_member(ctx.chat.id, Number(member?.id))    
  })
}