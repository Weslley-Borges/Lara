import { compareTwoStrings } from 'string-similarity'
import { IChatRepository } from './IChatRepository'
import { greetings } from '@config'
import { Response } from '@dtos'
import axios from 'axios'
import { Context } from 'grammy'


export class ChatRepository implements IChatRepository {
  async get_response(ctx:Context): Promise<Response.Message[]> {
    let responses:string[] = this.get_greetings(String(ctx.message?.text))

    if (responses[0].length == 0)
      responses = (await axios.get(`${process.env.LARA_API}chat`, {
        data:{message:ctx.message?.text}
      })).data.results
    
    return responses.map(msg => {return {text:msg}})
  }

  get_greetings(message:string): string[] {
    const now = new Date
    const hour = Number(now.toLocaleString().split(' ')[1].split(':')[0])

    for (let i=0; i < greetings.length; i++) {
      const { context, responses } = greetings[i]

      if (compareTwoStrings(context, message.toLowerCase()) < .65) continue
      
      for (let x=0; x < responses.length; x++) {
        if (responses[x].min <= hour && hour <= responses[x].max)
          return [responses[x]
            .messages[Math.floor(Math.random() * (responses[x].messages.length-0) + 0)]]
      }
    }
    return ['']
  }
}