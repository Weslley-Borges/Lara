import { Command, Response } from '@dtos'
import { commands } from '@commands'


class About implements Command {
  public name = 'about'
  public role = 'COMMON'
  public emoji = '❔'
  public description = 'Fala sobre um comando.'
  public arguments = []

  
  public async execute(ctx:any, args:string[]): Promise<Response.Message> {
    const searchedCommand = commands.filter(c => c.name == args.toString())[0]
    return searchedCommand ? {text:searchedCommand.description} : {text: 'Esse comando não existe...'}
  }
}

export const aboutCommand = new About