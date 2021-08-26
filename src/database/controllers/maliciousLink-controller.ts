import { IMaliciousLink, MaliciousLink } from "@database"


class MaliciousLinkController {
  async find_all(): Promise<IMaliciousLink[]|null> {
    return await MaliciousLink.find().exec()
  }
}
export const maliciousLinkController = new MaliciousLinkController