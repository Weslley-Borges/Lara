export async function execute(ctx:any, args:string[]) {
  const command = ctx.message?.text.split(" ")[0].toLowerCase()
  const marked = ctx.update.message.reply_to_message
  
  if (command === "!ban") {
    if (!args[0] && !marked) 
      return [{text:"Você deve marcar uma mensagem de quem quer expulsar, ou colocar o ID dessa pessoa."}]

    try {
      const to_ban = !isNaN(Number(args[0]))
        ? Number(args[0])
        : marked.from.id
      
      const member = await ctx.getChatMember(to_ban)
      ctx.kickChatMember(to_ban)
      return [{text:`O membro ${member.user.id} (${member.user.first_name}) foi expulso.`}]
    } catch(e) {
      return [{text:"Houve um erro nesse comando."}]
    }
  }
}