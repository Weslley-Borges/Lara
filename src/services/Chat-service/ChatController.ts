import { send_response } from '@src/helpers'
import { Context } from 'grammy'
import { ChatUseCase } from './ChatUseCase'


export class ChatController {
  constructor ( private chatUseCase:ChatUseCase ){}

  async handle(ctx:Context): Promise<void> {
    const result = await this.chatUseCase.execute(ctx)
    if (result) send_response(ctx, result)
  }
}