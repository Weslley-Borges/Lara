import { ChatRepository } from "./ChatRepository"
import { groupChatController } from "@database"
import { Response } from "@dtos"


export class ChatUseCase {
  constructor (
    private chatRepository: ChatRepository,
  ){}

  async execute(ctx:any): Promise<Response.Message[]> {
    if (ctx.chat.type.includes("group"))
      await groupChatController.evaluate_message(ctx.chat.id, ctx.from.id)
    
    return await this.chatRepository.get_response(ctx)
  }
}
