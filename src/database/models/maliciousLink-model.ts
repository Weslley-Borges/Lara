import { Schema, model } from "mongoose"


export interface IMaliciousLink {
  link_url:String
}

export const maliciousLinkSchema = new Schema<IMaliciousLink>(
  {
    link_url: {type:String, required:true}
  },
  {_id: false, autoIndex: false }
)

export const MaliciousLink = model<IMaliciousLink>('malicious_links', maliciousLinkSchema)