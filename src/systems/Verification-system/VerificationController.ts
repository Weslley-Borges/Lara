import { Response } from "@dtos"
import { VerificationUseCase } from "./VerificationUseCase"


export class VerificationController {
  constructor ( private verificationUseCase:VerificationUseCase ){}

  async handle(ctx:any): Promise<Response.Verification> {
    return await this.verificationUseCase.execute(ctx)
  }
}