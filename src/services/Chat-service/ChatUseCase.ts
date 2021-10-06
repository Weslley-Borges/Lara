import { ChatRepository } from './ChatRepository'
import { MessageDTO } from '@types'
import { Context } from 'grammy'
import { groupService } from '@src/database'


export class ChatUseCase {
  constructor (
    private chatRepository: ChatRepository,
  ){}

  async execute(ctx:Context): Promise<MessageDTO[]> {
    if (ctx.chat?.type.includes('group'))
      await groupService.evaluate_message(ctx.chat.id, Number(ctx.from?.id))
    return await this.chatRepository.get_response(ctx)
  }
}
