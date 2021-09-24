import { messages } from '@config'
import { Command, Response } from '@dtos'
import { is_adm } from '@src/helpers'
import { bot } from '@src/main'
import { Context } from 'grammy'


class Ban implements Command {
  name = 'ban'
  role = 'ADM'
  emoji = '❌'
  description = 
  'Bane um usuário. <b>OBS: Você precisa marcar uma mensagem desse usuário</b>.\n\n'+
  'Ex: PREFIXban <motivo do banimento>'
  arguments = [{type:'mark', error: messages.needs_to_mark+' do usuário que quer banir.'}]
  example_image = 'assets/img/Ban.png'


  async execute(ctx:Context, args:string[]): Promise<Response.Message> {
    const marked = ctx.update.message?.reply_to_message

    const toBan = Number(marked?.from?.id)
    if (!(await ctx.getChatMember(toBan))) return {text:'Esse usuário não está no grupo'}

    const reason = args.length === 0 ? 'Não especificado\\.' : args.join(' ')
    const member = await ctx.getChatMember(toBan)
    const isAdm = is_adm(ctx, member.user.id)

    if (member.user.id == bot.botInfo?.id || !isAdm) 
      return {text:'Eu não posso banir esse membro...'}

    ctx.banChatMember(member.user.id)
    return {
      text: `🚫 <a href="tg://user?id=${member.user.id}">${member.user.first_name}</a> foi banido!\n<b>Motivo:</b> ${reason}`
    }
  }
}

export const banCommand = new Ban