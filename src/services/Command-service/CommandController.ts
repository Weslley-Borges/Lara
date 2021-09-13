import { taskLogger, messages, prefix } from '@config'
import { Response, Command } from '@dtos'
import { commands } from '@commands'
import { Context } from 'telegraf'
import { is_adm } from '@helpers'


export class CommandController {
  async handle(ctx:any): Promise<Response.Message[]|any> {
    const splitedMessage = ctx.message?.text.substring(prefix.length).split(' ')
    const [commandName, args] = [splitedMessage[0], splitedMessage.slice(1)]
    const calledCommand = commands.filter(c => c.name == commandName)[0]

    const statusError = await this.validate_status(ctx, calledCommand)
    if (statusError) return statusError
    
    const argumentsError = this.validate_args(calledCommand.arguments, args)
    if (argumentsError) 
      return [{text:messages.argsError.replace('ARGS',commandName).replace('ERRORS',argumentsError)}]

    taskLogger.log_step('✅','Comando', 'END', `Usaram o comando ${commandName}`)
    return calledCommand.execute(ctx, args)
  }

  async validate_status(ctx:Context, command:Command|null): Promise<Response.Message[]|undefined> {
    if (!command) return [{text: messages.commandNotFound}]
    if (command.role === 'ADM') {
      if (!ctx.chat?.type.includes('group')) return [{text:messages.isNot_group}]

      const laraIsAdm = await is_adm(ctx, Number(process.env.BOT_ID))
      const userIsAdm = await is_adm(ctx, Number(ctx.message?.from.id))
      
      if (!userIsAdm) return [{text:messages.isNot_adm}]
      if (!laraIsAdm) return [{text:messages.lara_isNot_adm}]
    }
  }

  validate_args(cmd_args:{index:number, error:string}[], args:string[]): string|null {
    let error_message = ''

    for (const field of cmd_args)
      error_message = args[field.index] != undefined
        ? error_message
        : `${error_message}❗️${field.error}\n`
        
    return error_message !== '' ? error_message : null
  }
}