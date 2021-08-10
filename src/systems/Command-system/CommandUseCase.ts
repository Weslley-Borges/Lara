import { CommandRepository } from "./CommandRepository"
import { Context } from "telegraf"
import { messages } from "@config"
import { Response } from "@dtos"


export class CommandUseCase {
  constructor ( private commandRepository:CommandRepository ){}

  async execute(ctx:Context): Promise<Response.Message[]|string[]> {
    const status = await this.commandRepository.get_status(ctx)

    if (status.command == null) return [{text:status.error_message}]
    if (status.adm_func && !status.is_adm) return [{text:messages.isNot_adm}]

    return this.commandRepository.return_result(
      ctx, {
        args: status.args,
        command: status.command,
        error_message: this.commandRepository.verify_args(status.command, status.args)
      }
    )
  }
}
