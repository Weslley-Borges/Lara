import { IVerificationRepository } from "./IVerificationRepository"
import { maliciousLinkController } from "@database"
import { compareTwoStrings } from "string-similarity"
import { Response } from "@dtos"


export class VerificationRepository implements IVerificationRepository {
  async verify_message_content(words:string[]): Promise<Response.Verification> {
    let parts = ['https://', 'http://', '.com', '.app', 'www.']

    function get_links(words:string[]): string[] {
      words = words.join(' ').toLowerCase().split(' ')
      let urls:string[] = []
  
      words.forEach(word => {
        parts.forEach(part => {
          if (word.includes(part) && urls.indexOf(word) === -1)
            urls.push(word)
        })
      })
      return urls
    }

    const urls = get_links(words)
    if (urls === []) return {messages:[], malicious:false}

    return maliciousLinkController.find_all().then(results => {
      let result = {
        messages:[{text:`<b>PERSON</b>, não mande lsinks maliciosos...`}],
        malicious: false
      }

      if (results == null) return result

      const db_links = results.map(link => {
        parts.forEach(part => link.link_url = link.link_url.replace(part, ''))
        return link.link_url.split("/")[0].toLowerCase()
      })
      const uris = urls.map(url => {
        parts.forEach(part => url = url.replace(part, ''))
        return url.split("/")[0]
      })

      for (let x=0; x < uris.length && !result.malicious; x++) {
        for (let y=0; y < db_links.length && !result.malicious; y++) {
          if (compareTwoStrings(uris[x], db_links[y]) >= 0.8) result.malicious = true
        }
      }
      return result
    })
  }
}