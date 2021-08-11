import { IChatRepository } from "./IChatRepository"
import { greetings } from "@config"
import { Response } from "@dtos"
import axios from "axios"


export class ChatRepository implements IChatRepository {
  async get_response(ctx:any): Promise<Response.Message[]> {
    let response:string[] = get_greetings(ctx.message?.text)

    if (response[0].length == 0) {
      response = (await axios.get(`${process.env.LARA_API}chat`, {
        data:{message:ctx.message?.text}
      })).data.results
    }
    return response.map((msg) => {return {text:msg.replace('PERSON', ctx.from.first_name)}})


    function get_greetings(message:string): string[] {
      const now = new Date
      const hour = Number(now.toLocaleString().split(" ")[1].split(":")[0])
  
      for (let i=0; i < greetings.length; i++) {
        if (greetings[i].context.indexOf(message.toLowerCase()) == -1) continue
        
        for (let x=0; x < greetings[i].responses.length; x++) {
          const responses = greetings[i].responses        
          if (responses[x].min > hour || hour > responses[x].max) continue
  
          const random = Math.floor(Math.random() * (responses[x].messages.length - 0) + 0)
          return [responses[x].messages[random]]
        }
      }
      return [""]
    }
  }
}