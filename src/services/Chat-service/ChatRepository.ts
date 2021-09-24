import { compareTwoStrings } from 'string-similarity'
import { IChatRepository } from './IChatRepository'
import { greetings, messageContexts } from '@config'
import { Response } from '@dtos'
import { Context } from 'grammy'
import axios from 'axios'


export class ChatRepository implements IChatRepository {
  async get_response(ctx:Context): Promise<Response.Message[]> {
    let responses:string[] = this.get_greetings(String(ctx.message?.text))

    if (responses[0].length == 0)
      responses = (await axios.get(`${process.env.LARA_API}chat`, {
        data:{message:ctx.message?.text, contexts:messageContexts}
      })).data.results

    return responses.map(msg => {return {text:msg}})
  }

  get_greetings(message:string): string[] {
    const now = new Date
    const hour = Number(now.toLocaleString().split(' ')[1].split(':')[0])

    for (const greeting of greetings) {
      if (compareTwoStrings(greeting.context, message.toLowerCase()) < .65) continue

      for (const response of greeting.responses) {
        if (response.min <= hour && hour <= response.max)
          return [response.messages[Math.floor(Math.random() * (response.messages.length-0) + 0)]]
      }
    }
    return ['']
  }
}