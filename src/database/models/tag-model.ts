import { Schema, model } from "mongoose"


export interface ITag {
  tag_id: Number
  tag_name: String
  tag_uses: Number
}

const tagSchema = new Schema<ITag>(
  {
    tag_id: {type: Number, required:true},
    tag_name: {type: String, required:true},
    tag_uses: {type: Number}
  },
  {_id: false, autoIndex: false }
)

export const Tag = model<ITag>('Tag', tagSchema)