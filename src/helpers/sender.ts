import { Response } from "@dtos"


export function send_response(ctx:any, responses:Response.Message[]|string[]): void {
  if ((responses[0] as Response.Message).text !== undefined) {
    responses = responses as Response.Message[]
    responses.forEach(response => send_one(ctx, response))
  } else {
    responses = responses as string[]
    send_many(ctx, responses)
  }
}

function send_many(ctx:any, contents:string[]) {
  let stats = {message:"", count:0}

  contents.forEach(content => {
    if(stats.count !== 10) return stats = {message: stats.message+content, count: stats.count + 1}
    send_one(ctx, {text:stats.message, chat:"PRIVATE"})
    stats = {message:"", count:0}
  })
  if (stats.message != "") send_one(ctx, {text:stats.message, chat:"PRIVATE"})
} 

function send_one(ctx:any, msg:Response.Message) {
  let tg = ctx.telegram
  let chat:string

  if (msg.chat == "PRIVATE") chat = String(ctx.from?.id)
  else if (msg.chat == undefined) chat = String(ctx.chat?.id)
  else chat = String(msg.chat)

  try {
    let message = msg.text
    if (msg.text != undefined) message = replace_holders(ctx, msg.text)

    if (msg.image){
      tg.sendPhoto(chat, msg.image, {caption:message, parse_mode:"HTML", reply_markup:msg.markup})

    } else if (msg.text) {
      tg.sendMessage(chat, message, {parse_mode:"HTML", reply_markup:msg.markup})
    }

  } catch(e) {ctx.reply("Opa, não consegui enviar a mensagem.")}
}

function replace_holders(ctx:any, message:string) {
  return message
    .replace("PERSON", ctx.from.first_name)
}