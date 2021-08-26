import { Response } from "@dtos"


export function send_response(ctx:any, responses:Response.Message[]|string[]): void {
  typeof(responses[0]) != "string"
    ? (responses as Response.Message[]).forEach(msg => send_one(ctx, msg))
    : send_many(ctx, responses as string[])
}

function send_many(ctx:any, contents:string[]): void {
  let to_send:string[] = []

  contents.forEach(content => {
    if (to_send.length !== 10) 
      return to_send.push(content)
    send_one(ctx, {text:to_send.join("\n\n"), chat:"PRIVATE"})
    return to_send = []
  })

  if (to_send.length !== 0) send_one(ctx, {text:to_send.join("\n\n"), chat:"PRIVATE"})
} 

function send_one(ctx:any, msg:Response.Message): void {  
  const tg = ctx.telegram
  const chat = String(get_chat(ctx, msg))

  try {
    let message = msg.text ? replace_holders(ctx, msg.text) : null

    if (msg.image)
      tg.sendPhoto(chat, msg.image, {caption:message, parse_mode:"HTML", reply_markup:msg.markup})
    else if (msg.text)
      tg.sendMessage(chat, message, {parse_mode:"HTML", reply_markup:msg.markup})

  } catch(e) {ctx.reply("Opa, não consegui enviar a mensagem.")}


  function get_chat(ctx:any, msg:Response.Message) {
    switch(msg.chat) {
      case "PRIVATE": return ctx.from?.id
      case undefined: return ctx.chat?.id
      default: return msg.chat
    }
  }
}

function replace_holders(ctx:any, message:string) {
  return message
    .replace("PERSON", ctx.from.first_name)
}