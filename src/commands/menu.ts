import { commands } from "@config"


export function execute(ctx:any, args:string[]) {
  let message = "MENU DE COMANDOS\n\n"
  commands.forEach(cmd => 
    message += `${cmd.emoji} <b>${cmd.name}</b> - <code>${cmd.description}</code>\n`
  )
  return [{text: message}]
}