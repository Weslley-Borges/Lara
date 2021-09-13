import { Response } from '@dtos'
import { IVerificationRepository } from './IVerificationRepository'


export class VerificationUseCase {
  constructor(private verificationRepository: IVerificationRepository) {}

  async execute(ctx:any): Promise<Response.Verification> {
    const verifications = [
      await this.verificationRepository.find_malicious_links(ctx.message?.text.split(' '))
    ]

    for (let i=0; verifications.length > i; i++)
      if (verifications[i].malicious) return verifications[i]

    return {messages:[], malicious:false}
  }
}