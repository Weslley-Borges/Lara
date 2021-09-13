import { Command, Response } from '@dtos'
import { is_adm } from '@src/helpers'
import { bot } from '@src/main'


class Ban implements Command {
  public name = 'ban'
  public role = 'ADM'
  public emoji = '❌'
  public description = 'Bane um usuário. Você pode usar o id ou marcar uma mensagem desse usuário.'
  public arguments = []

  
  public async execute(ctx:any, args:string[]): Promise<Response.Message[]> {
    const marked = ctx.update.message.reply_to_message
    
    if (!args[0] && !marked) 
      return [{text:'Você deve marcar uma mensagem, ou colocar o ID dessa pessoa.'}]

    const toBan = !isNaN(Number(args[0])) ? Number(args[0]) : marked.from.id
    const member = await ctx.getChatMember(toBan)
    const isAdm = is_adm(ctx, member)

    if (member.user.id == bot.botInfo?.id || !isAdm) 
      return [{text:'Eu não posso expulsar esse membro...'}]

    ctx.kickChatMember(toBan)
    return [{text:`O membro ${member.user.id} (${member.user.first_name}) foi expulso.`}]
  }
}

export const banCommand = new Ban