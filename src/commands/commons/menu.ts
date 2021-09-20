import { commands } from '@commands'
import { Command, Response } from '@dtos'
import { Context } from 'telegraf'


class Menu implements Command {
  public name = 'menu'
  public role = 'COMMON'
  public emoji = '📊'
  public description = 'Mostra os comandos.'
  public arguments = []
  public example_image = 'assets/img/Menu.png'

  
  public execute(ctx:Context): Response.Message {
    let message = 'MENU DE COMANDOS\n\n'
    for (const cmd of commands) {
      if (!ctx.message?.chat.type.includes('group') && cmd.role === 'ADM') continue
      message += `${cmd.emoji} <b>${cmd.name}</b> - <code>${cmd.description.split('.')[0]}</code>\n`
    }

    return {text: message}
  }
}

export const menuCommand = new Menu