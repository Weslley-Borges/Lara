import { send_response } from '@src/helpers'
import { Context } from 'grammy'
import { ChatUseCase } from './ChatUseCase'


export class ChatController {
  constructor ( private chatUseCase:ChatUseCase ){}

  async handle(ctx:Context): Promise<void> {
    send_response(ctx, await this.chatUseCase.execute(ctx))
  }
}