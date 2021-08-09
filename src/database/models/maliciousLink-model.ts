import {Schema, model, Model, Document} from "mongoose"


export interface IMaliciousLink extends Document {
  link_url:String
}
export const maliciousLinkSchema = new Schema(
  {link_url: {type:String, required:true}},
  {_id: false, autoIndex: false }
)

export const MaliciousLink: Model<IMaliciousLink> = model('malicious_links', maliciousLinkSchema)