import { ICommandRepository } from './ICommandRepository'
import { Command, Response } from '@dtos'
import { Context } from 'grammy'
import { messages } from '@config'
import { is_adm } from '@src/helpers'
import { bot } from '@src/main'


export class CommandRepository implements ICommandRepository {
  async validate_status(ctx:Context, command:Command|null): Promise<Response.Message[]|undefined> {
    if (!command) return [{text: messages.commandNotFound}]
    if (command.role === 'ADM') {
      if (!ctx.chat?.type.includes('group')) return [{text:messages.isNot_group}]

      const laraIsAdm = await is_adm(ctx, Number(bot.botInfo?.id))
      const userIsAdm = await is_adm(ctx, Number(ctx.message?.from?.id))
      
      if (!userIsAdm) return [{text:messages.isNot_adm}]
      if (!laraIsAdm) return [{text:messages.lara_isNot_adm}]
    }
  }

  validate_arguments(cmd_args:{index:number, error:string}[], args:string[]): string|null {
    let error_message = ''

    for (const field of cmd_args)
      error_message = args[field.index]
        ? error_message
        : `${error_message}❗️${field.error}\n`
        
    return error_message !== '' ? error_message : null
  }
}