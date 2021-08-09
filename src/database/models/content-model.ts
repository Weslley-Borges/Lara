import { Schema, model, Model, Document } from "mongoose"


export interface IContent extends Document {
  content_tags: Number[]
  content_source: String
  content_created_at: Date
  content_from: String
}

const contentSchema = new Schema(
  {
    content_tags: {type:Array, default:[]},
    content_source: {type:String, required:true},
    content_created_at: {type:Date, required:true},
    content_from: {type:String, required:true}
  },
  {_id: false, autoIndex: false }
)

export const Content: Model<IContent> = model('contents', contentSchema)