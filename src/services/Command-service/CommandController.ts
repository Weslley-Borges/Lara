import { send_response } from '@src/helpers'
import { Context } from 'grammy'
import { CommandUseCase } from './CommandUseCase'


export class CommandController {
  constructor ( private commandUseCase:CommandUseCase ){}

  async handle(ctx:Context): Promise<void> {
    let result = await this.commandUseCase.execute(ctx)
    result = Array.isArray(result) ? result : [result]

    send_response(ctx, result)
  }
}