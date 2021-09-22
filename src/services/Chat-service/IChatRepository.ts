import { Response } from '@dtos'
import { Context } from 'grammy'

export interface IChatRepository {
  get_response: (ctx:Context) => Promise<Response.Message[]>
}