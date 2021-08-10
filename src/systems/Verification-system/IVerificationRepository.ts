import { Response } from "@dtos"

export interface IVerificationRepository {
  verify_message_content: (weords:string[]) => Promise<Response.Verification>
}
