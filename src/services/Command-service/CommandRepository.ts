import { taskLogger, messages, prefix, commands } from "@config"
import { Response, Command } from "@dtos"
import { ICommandRepository }from "./ICommandRepository"


export class CommandRepository implements ICommandRepository {
  verify_args(command:Command.Profile, args:string[]): string {
    let error_message = ""

    command.arguments.forEach((field) => {
      error_message = args[field.index] != undefined
        ? error_message
        : `${error_message}❗️${field.error}\n`
    })
    return error_message
  }

  return_result(ctx:any, data:Command.Process): Response.Message[]|string[] {
    if (data.error_message.length !== 0)
      return [{
        text:messages.argsError
          .replace("PREFIX",prefix)
          .replace("ARGS",data.command.name)
          .replace("ERRORS",data.error_message)
      }]
  
    try {
      taskLogger.logStep('✅','Comando', 'END', `Usaram o comando ${data.command.name}`)
      return require(`../../commands/${data.command.path}.ts`).execute(ctx, data.args)
    } catch(e) {
      return [{text:"Eita, parece que houve um erro no sistema de comandos..."}]
    }
  }

  async get_status(ctx:any): Promise<Command.Status> {
    const args = ctx.message.text.slice(prefix.length).split(" ")
    const name = args.shift().toLowerCase()
    const command = commands.find(cmd => {return cmd.name.toLowerCase() == name})

    let adm = ctx.chat.type != "private"
      ? await (await ctx.getChatAdministrators())
        .find(adm => {return adm.user.id == ctx.from.id}) != undefined
      : false

    return {
      args,
      command,
      is_adm:adm,
      error_message:messages.commandNotFound
    }
  }
}
