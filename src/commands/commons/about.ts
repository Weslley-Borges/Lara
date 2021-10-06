import { Command, MessageDTO } from '@types'
import { commands } from '@commands'
import { Context, InputFile } from 'grammy'


class About implements Command {
  name = 'about'
  role = 'COMMON'
  emoji = '❔'
  description = 'Fala sobre um comando.\n\nEx: PREFIXabout google'
  arguments = [{type:'text', index:0, error: 'Escreva o comando do qual quer saber mais.'}]
  example_image = 'assets/img/About.png'


  async execute(ctx:Context, args:string[]): Promise<MessageDTO> {
    const searchedCommand = commands.filter(c => c.name == args.toString())[0]
    return searchedCommand 
      ? {text:searchedCommand.description, image: new InputFile(searchedCommand.example_image)} 
      : {text:'Esse comando não existe...'}
  }
}

export const aboutCommand = new About