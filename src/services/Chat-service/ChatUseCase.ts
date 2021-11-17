import { ChatRepository } from './ChatRepository'
import { MessageDTO } from '@types'
import { Context } from 'grammy'
import { groupService } from '@src/database'


export class ChatUseCase {
  constructor (
    private chatRepository: ChatRepository,
  ){}

  async execute(ctx:Context): Promise<MessageDTO[]|void> {
    if (ctx.chat?.type.includes('group'))
      await groupService.evaluate_message(ctx.chat.id, Number(ctx.from?.id))

    if (String(ctx.message?.text).split(' ').length < 20)
      return await this.chatRepository.get_response(ctx)
  }
}
