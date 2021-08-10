import { Response } from "@dtos"
import { VerificationUseCase } from "./VerificationUseCase"


export class VerificationController {
  constructor ( private verificationUseCase:VerificationUseCase ){}

  async handle(ctx:any): Promise<Response.Result> {
    let result = await this.verificationUseCase.execute(ctx)

    return {
      messages: result.messages,
      malicious: result.malicious,
      send_many: false
    }
  }
}