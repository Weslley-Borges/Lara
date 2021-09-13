import { Schema, model, Document } from 'mongoose'


export interface IMaliciousLink extends Document {
  link_url:String
}

export const maliciousLinkSchema = new Schema<IMaliciousLink>({
  link_url: {type:String, required:true}
})

export const maliciousLink = model<IMaliciousLink>('malicious_links', maliciousLinkSchema)