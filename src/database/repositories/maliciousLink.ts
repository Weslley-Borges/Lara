import { IMaliciousLink, maliciousLink } from '@database'


class MaliciousLinkController {
  async find_all(): Promise<IMaliciousLink[]|null> {
    return await maliciousLink.find().exec()
  }
}
export const maliciousLinkController = new MaliciousLinkController