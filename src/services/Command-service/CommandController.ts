import { Response } from '@dtos'
import { Context } from 'grammy'
import { CommandUseCase } from './CommandUseCase'


export class CommandController {
  constructor ( private commandUseCase:CommandUseCase ){}

  async handle(ctx:Context): Promise<Response.Message[]|string[]> {
    const result = await this.commandUseCase.execute(ctx)
    return Array.isArray(result) ? result : [result]
  }
}