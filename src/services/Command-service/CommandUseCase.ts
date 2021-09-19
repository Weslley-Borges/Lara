import { messages, prefix, taskLogger } from '@config'
import { Response } from '@dtos'
import { commands } from '@src/commands'
import { ICommandRepository } from './ICommandRepository'


export class CommandUseCase {
  constructor(private commandRepository: ICommandRepository) {}

  async execute(ctx:any): Promise<Response.Message|Response.Message[]|string[]> {
    const splitedMessage = ctx.message?.text.substring(prefix.length).split(' ')
    const [commandName, args] = [splitedMessage[0], splitedMessage.slice(1)]
    const calledCommand = commands.filter(c => c.name == commandName)[0]

    const statusError = await this.commandRepository.validate_status(ctx, calledCommand)
    if (statusError) return statusError
    
    const argumentsError = this.commandRepository.validate_arguments(calledCommand.arguments, args)
    if (argumentsError) 
      return [{text:messages.argsError.replace('ARGS',commandName).replace('ERRORS',argumentsError)}]

    taskLogger.log_step('✅','Comando', 'END', `Usaram o comando ${commandName}`)
    return await calledCommand.execute(ctx, args)
  }
}