import { prefix } from '@config'
import { Response } from '@dtos'


export function send_response(ctx:any, responses:Response.Message[]|string[]): void {
  typeof responses[0] == 'string'
    ? send_many_texts_in_one_message(ctx, responses as string[])
    : (responses as Response.Message[]).forEach(msg => send_one_message(ctx, msg))
}

function replace_holders(ctx:any, message:string) {
  return message
    .replace('PERSON', ctx.from.first_name)
    .replace('PREFIX',prefix)
}


function send_many_texts_in_one_message(ctx:any, contents:string[]): void {
  let to_send:string[] = []

  for (const content of contents) {
    if (to_send.length === 10) {
      send_one_message(ctx, {text:to_send.join('\n\n'), chat:'PRIVATE'})
      to_send = []
      continue
    }
    to_send.push(content)
  }

  if (to_send.length !== 0) send_one_message(ctx, {text:to_send.join('\n\n'), chat:'PRIVATE'})
} 

function send_one_message(ctx:any, msg:Response.Message): void {  
  let chat = msg.chat
  const tg = ctx.telegram
  const message = replace_holders(ctx, msg.text||'')
  const options = { parse_mode:'HTML', caption:message, reply_markup:msg.markup }

  switch(msg.chat) {
  case 'PRIVATE': chat = ctx.from?.id; break
  case undefined: chat = ctx.chat?.id
  }

  if (msg.image) tg.sendPhoto(chat, msg.image, options)
  else if (msg.text) tg.sendMessage(chat, message, options)
}