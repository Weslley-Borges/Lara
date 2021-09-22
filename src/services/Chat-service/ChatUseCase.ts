import { ChatRepository } from './ChatRepository'
import { Response } from '@dtos'
import { Context } from 'grammy'


export class ChatUseCase {
  constructor (
    private chatRepository: ChatRepository,
  ){}

  async execute(ctx:Context): Promise<Response.Message[]> {    
    return await this.chatRepository.get_response(ctx)
  }
}
