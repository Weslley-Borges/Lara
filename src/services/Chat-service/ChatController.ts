import { Response } from '@dtos'
import { Context } from 'grammy'
import { ChatUseCase } from './ChatUseCase'


export class ChatController {
  constructor ( private chatUseCase:ChatUseCase ){}

  async handle(ctx:Context): Promise<Response.Message[]> {
    return await this.chatUseCase.execute(ctx)
  }
}