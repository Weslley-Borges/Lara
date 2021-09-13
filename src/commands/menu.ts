import { commands } from '@commands'
import { Command } from '@dtos'


class Menu implements Command {
  public name = 'menu'
  public role = 'COMMON'
  public emoji = '📊'
  public description = 'Mostra os comandos.'
  public arguments = []

  
  public execute(): any {
    let message = 'MENU DE COMANDOS\n\n'
    for (const cmd of commands) 
      message += `${cmd.emoji} <b>${cmd.name}</b> - <code>${cmd.description.split('.')[0]}</code>\n`

    return [{text: message}]
  }
}

export const menuCommand = new Menu