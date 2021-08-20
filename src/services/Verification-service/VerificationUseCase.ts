import { Response } from "@dtos";
import { IVerificationRepository } from "./IVerificationRepository";


export class VerificationUseCase {
  constructor(private verificationRepository: IVerificationRepository) {}

  async execute(ctx:any): Promise<Response.Verification> {
    const verifications = [
      await this.verificationRepository.verify_message_content(ctx.message.text.split(" "))
    ]

    for (let index=0; verifications.length > index; index++) {
      if (verifications[index].malicious) return verifications[index]
    }

    return {
      messages: [],
      malicious: false
    }
  }
}