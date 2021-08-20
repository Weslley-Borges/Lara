import { Response } from "@dtos"
import { ChatUseCase } from "./ChatUseCase"


export class ChatController {
  constructor ( private chatUseCase:ChatUseCase ){}

  async handle(ctx:any): Promise<Response.Message[]> {
    return await this.chatUseCase.execute(ctx)
  }
}