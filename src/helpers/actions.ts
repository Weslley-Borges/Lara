import { chatController, commandController, verificationController } from '@services'
import { messages, prefix, taskLogger } from '@config'
import { groupController } from '@database'
import { is_adm, send_response } from '@helpers'
import { Telegraf } from 'telegraf'


export const actions = (bot: Telegraf) => {
  bot.use(async (ctx, next) => {
    console.time('Processing time')
    await next()
    console.timeEnd('Processing time')
  })

  bot.on('text', async ctx => {
    const verification = await verificationController.handle(ctx, 'text')
    if (verification.malicious) return send_response(ctx, verification.messages)
    
    send_response(ctx, ctx.message.text.startsWith(prefix)
      ? await commandController.handle(ctx)
      : await chatController.handle(ctx)
    )
  })

  bot.action('unban', async (ctx:any) => {
    if (!is_adm(ctx, ctx.callbackQuery.from.id)) return {text: messages.isNot_adm}

    const entities = ctx.callbackQuery.message?.entities
    
    if (entities[0].type === 'text_mention') {
      try {
        await ctx.unbanChatMember(entities[0].user.id)
        await ctx.reply('📕 Usuário desbanido.')
    
      } catch (e) { await ctx.reply('⚠️ Não posso desbanir esse usuário!' ) }
    }
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
}