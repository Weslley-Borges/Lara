import { Response } from '@dtos'

export interface IVerificationRepository {
  find_malicious_links: (weords:string[]) => Promise<Response.Verification>
  get_urls_from_message: (words:string[]) => string[]
}
