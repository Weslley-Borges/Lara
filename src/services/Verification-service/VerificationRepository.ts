import { IVerificationRepository } from './IVerificationRepository'
import { maliciousLinkController } from '@database'
import { compareTwoStrings } from 'string-similarity'
import { Response } from '@dtos'
import { URL } from 'url'


export class VerificationRepository implements IVerificationRepository {
  async find_malicious_links(words:string[]): Promise<Response.Verification> {
    const result = {messages:[{text:'<b>PERSON</b>, não mande links maliciosos...'}], malicious:false}

    const urls = this.get_urls_from_message(words).map(url => {
      const parts = url.split('.')
      return parts[0] === 'www' ? parts[1] : parts[0]
    })

    const maliciousUrls = await maliciousLinkController.find_all()
      .then(links => { 
        if (links) return links.map(uri => { return new URL(String(uri.link_url)).hostname })
      })
    
    if (maliciousUrls != null)
      urls.forEach(url => maliciousUrls.forEach(link => {
        if (compareTwoStrings(url, link) < 0.8) return
        result.malicious = true, urls.length = maliciousUrls.length = 0
      }))

    return result
  }
  
  get_urls_from_message(words:string[]): string[] {
    const urls:string[] = []

    words.forEach(word => { try { urls.push(new URL(word).hostname) } catch (err) {null} })
    return urls
  }
}