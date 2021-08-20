import { CommandUseCase } from "./CommandUseCase"


export class CommandController {
  constructor ( private commandUseCase: CommandUseCase ){}

  async handle(ctx:any) {
    return await this.commandUseCase.execute(ctx)
  }
}