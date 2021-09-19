import { Command, Response } from '@dtos'
import { Context } from 'telegraf'

export interface ICommandRepository {
  validate_status: (ctx:Context, command:Command|null) => Promise<Response.Message[]|undefined>
  validate_arguments: (cmd_args:{index:number, error:string}[], args:string[]) => string|null
}
