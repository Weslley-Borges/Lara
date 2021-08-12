import { Schema, model, Model, Document } from "mongoose"


export interface ITag extends Document {
  tag_id: Number
  tag_name: String
  tag_uses: Number
}

const tagSchema = new Schema(
  {
    tag_id: {type: Number, required:true},
    tag_name: {type: String, required:true},
    tag_uses: {type: Number}
  },
  {_id: false, autoIndex: false }
)

export const Tag: Model<ITag> = model('Tag', tagSchema)