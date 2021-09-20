import { Response } from '@dtos'
import { CommandUseCase } from './CommandUseCase'


export class CommandController {
  constructor ( private commandUseCase:CommandUseCase ){}

  async handle(ctx:any): Promise<Response.Message[]|string[]> {
    const result = await this.commandUseCase.execute(ctx)
    return Array.isArray(result) ? result : [result]
  }
}