import { Response } from "@dtos"

export interface IVerificationRepository {
  find_invalid_links: (weords:string[]) => Promise<Response.Verification>
  get_message_links: (words:string[]) => string[]
}
