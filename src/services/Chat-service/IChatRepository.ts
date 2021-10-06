import { MessageDTO } from '@types'
import { Context } from 'grammy'

export interface IChatRepository {
  get_response: (ctx:Context) => Promise<MessageDTO[]>
}