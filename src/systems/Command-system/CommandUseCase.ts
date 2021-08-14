import { CommandRepository } from "./CommandRepository"
import { Context } from "telegraf"
import { messages, bot } from "@config"
import { Response } from "@dtos"


export class CommandUseCase {
  constructor ( private commandRepository:CommandRepository ){}

  async execute(ctx:Context): Promise<Response.Message[]|string[]> {
    const status = await this.commandRepository.get_status(ctx)
    const lara_adm =  ctx.chat?.type.includes("group")
      ? (await ctx.getChatAdministrators())
        .find((adm:any) => {return adm.user.id === bot.botInfo?.id}) != undefined
      : false

    if (status.command == null) return [{text:status.error_message}]
    if (status.command.status == "ADM") {
      if (!ctx.chat?.type.includes("group")) return [{text:messages.isNot_group}]
      if (!status.is_adm) return [{text:messages.isNot_adm}]
      if (!lara_adm) return [{text:messages.lara_isNot_adm}]
    }

    return this.commandRepository.return_result(
      ctx, {
        args: status.args,
        command: status.command,
        error_message: this.commandRepository.verify_args(status.command, status.args)
      }
    )
  }
}
