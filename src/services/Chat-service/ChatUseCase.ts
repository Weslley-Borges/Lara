import { ChatRepository } from './ChatRepository'
import { Response } from '@dtos'


export class ChatUseCase {
  constructor (
    private chatRepository: ChatRepository,
  ){}

  async execute(ctx:any): Promise<Response.Message[]> {    
    return await this.chatRepository.get_response(ctx)
  }
}
