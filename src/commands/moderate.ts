export async function execute(ctx:any, args:string[]) {
  const command = ctx.message?.text.split(" ")[0].toLowerCase()
  const marked = ctx.update.message.reply_to_message
  
  if (command === "!ban") {
    if (marked == undefined) return [{text:"Você precisa marcar uma mensagem de quem quer expulsar."}]
    ctx.kickChatMember(marked.from.id)
    return [{text:`O membro ${marked.from.id} (${marked.from.first_name}) foi expulso.`}]
  }
}