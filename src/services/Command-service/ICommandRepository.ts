import { Command, MessageDTO } from '@types'
import { Context } from 'grammy'

export interface ICommandRepository {
  validate_status: (ctx:Context, command:Command|null) => Promise<MessageDTO[]|undefined>
  validate_arguments: (ctx:Context, cmd_args:any[], args:string[]) => string|null
}
