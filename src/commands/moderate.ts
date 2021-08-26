import { bot } from "@config"


export async function execute(ctx:any, args:string[]) {
  const command = ctx.message?.text.split(" ")[0].toLowerCase()
  const marked = ctx.update.message.reply_to_message
  
  if (command === "!ban") {
    if (!args[0] && !marked) 
      return [{text:"Você deve marcar uma mensagem, ou colocar o ID dessa pessoa."}]

    try {
      const toBan = !isNaN(Number(args[0])) ? Number(args[0]) : marked.from.id
      const {member, can_ban} = await verify_if_is_an_adm(ctx, toBan)

      if (member.user.id == bot.botInfo?.id || !can_ban) 
        return [{text:"Eu não posso expulsar esse membro..."}]

      ctx.kickChatMember(toBan)
      return [{text:`O membro ${member.user.id} (${member.user.first_name}) foi expulso.`}]

    } catch(e) { return [{text:"Houve um erro nesse comando."}] }
  }
}

async function verify_if_is_an_adm(ctx:any, to_ban:any): Promise<{member:any, can_ban:boolean}> {
  const member = await ctx.getChatMember(to_ban)
  const can_ban = await (await ctx.getChatAdministrators())
    .find((adm:any) => {return adm.user.id == member.user.id}) == undefined

  return {member, can_ban}
}