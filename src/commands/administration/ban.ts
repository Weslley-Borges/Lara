import { Command, Response } from '@dtos'
import { is_adm } from '@src/helpers'
import { bot } from '@src/main'


class Ban implements Command {
  public name = 'ban'
  public role = 'ADM'
  public emoji = '❌'
  public description = 
    'Bane um usuário. <b>OBS: Você precisa marcar uma mensagem desse usuário</b>.\n\n'+
    'Ex: PREFIXban <motivo do banimento>'
  public arguments = []
  public example_image = 'assets/img/Ban.png'

  
  public async execute(ctx:any, args:string[]): Promise<Response.Message> {
    const marked = ctx.update.message.reply_to_message
    
    if (!marked) return {text:'Você deve marcar uma mensagem do usuário que quer banir.'}
    if (!(await ctx.getChatMember(marked.from.id))) return {text:'Esse usuário não está no grupo'}

    const reason = args.length === 0 ? 'Não especificado\\.' : args.join(' ')
    const member = await ctx.getChatMember(marked.from.id)
    const isAdm = is_adm(ctx, member.user.id)

    if (member.user.id == bot.botInfo?.id || !isAdm) 
      return {text:'Eu não posso banir esse membro...'}
  
    ctx.kickChatMember(member.user.id)
    return {
      text: `🚫 <a href="tg://user?id=${member.user.id}">${member.user.first_name}</a> foi banido!\n<b>Motivo:</b> ${reason}`,
      markup: {inline_keyboard:[[{text:'Desbane', callback_data: 'unban'}]]}
    }
  }
}

export const banCommand = new Ban