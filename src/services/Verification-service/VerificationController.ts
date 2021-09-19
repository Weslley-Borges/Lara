import { Response } from '@dtos'
import { Context } from 'telegraf'
import { VerificationUseCase } from './VerificationUseCase'


export class VerificationController {
  constructor ( private verificationUseCase:VerificationUseCase ){}

  async handle(ctx:Context, type:string): Promise<Response.Verification> {
    console.log(type)
    return await this.verificationUseCase.execute(ctx)
  }
}