import { prefix } from '@config'
import { MessageDTO } from '@types'
import { Context } from 'grammy'


export function send_response(ctx:Context, responses:MessageDTO[]|string[]): void {
  typeof responses[0] == 'string'
    ? send_many_texts_in_one_message(ctx, responses as string[])
    : (responses as MessageDTO[]).forEach(msg => send_one_message(ctx, msg))
}

function replace_holders(ctx:Context, message:string) {
  return message
    .replace('PERSON', String(ctx.message?.from?.first_name))
    .replace('PREFIX', prefix)
}


function send_many_texts_in_one_message(ctx:Context, contents:string[]): void {
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

function send_one_message(ctx:Context, msg:MessageDTO): void {  
  let chat = String(msg.chat)
  const message = msg.text ? replace_holders(ctx, msg.text) : undefined

  switch(msg.chat) {
  case 'PRIVATE': chat = String(ctx.from?.id); break
  case undefined: chat = String(ctx.chat?.id)
  }

  if (msg.image) ctx.api.sendPhoto(chat, msg.image, { parse_mode:'HTML', caption:message })
  else if (message) ctx.api.sendMessage(chat, message, { parse_mode:'HTML', reply_markup:msg.markup })
}