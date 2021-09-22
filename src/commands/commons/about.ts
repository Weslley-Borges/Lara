import { Command, Response } from '@dtos'
import { commands } from '@commands'
import { Context } from 'grammy'


class About implements Command {
  name = 'about'
  role = 'COMMON'
  emoji = '❔'
  description = 'Fala sobre um comando.\n\nEx: PREFIXabout google'
  arguments = []
  example_image = 'assets/img/About.png'


  async execute(ctx:Context, args:string[]): Promise<Response.Message> {
    const searchedCommand = commands.filter(c => c.name == args.toString())[0]
    return searchedCommand 
      ? {text:searchedCommand.description, image: {source: searchedCommand.example_image}} 
      : {text: 'Esse comando não existe...'}
  }
}

export const aboutCommand = new About