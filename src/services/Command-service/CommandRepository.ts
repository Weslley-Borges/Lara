import { ICommandRepository } from './ICommandRepository'
import { Command, MessageDTO } from '@types'
import { Context } from 'grammy'
import { messages } from '@config'
import { is_adm } from '@src/helpers'
import { bot } from '@src/main'


export class CommandRepository implements ICommandRepository {
  async validate_status(ctx:Context, command:Command|null): Promise<MessageDTO[]|undefined> {
    if (!command) return [{text: messages.commandNotFound}]
    if (command.role === 'ADM') {
      if (!ctx.chat?.type.includes('group')) return [{text:messages.isNot_group}]

      const laraIsAdm = await is_adm(ctx, Number(bot.botInfo?.id))
      const userIsAdm = await is_adm(ctx, Number(ctx.message?.from?.id))
      
      if (!userIsAdm) return [{text:messages.isNot_adm}]
      if (!laraIsAdm) return [{text:messages.lara_isNot_adm}]
    }
  }

  validate_arguments(ctx:Context, cmd_args:any[], args:string[]): string|null {
    let error_message = ''

    for (const field of cmd_args) {
      const isEmpyt = !args[field.index] && field.type == 'text'
      const isMarkEmpyt = field.type == 'mark' && !ctx.update.message?.reply_to_message

      error_message = isEmpyt || isMarkEmpyt
        ? `${error_message}❗️${field.error}\n`
        : error_message
    }
        
    return error_message !== '' ? error_message : null
  }
}