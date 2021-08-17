import { Schema, model, Document } from "mongoose"


export interface ITag extends Document{
  tag_name: String
  tag_uses: Number
}

const tagSchema = new Schema<ITag>({
  tag_name: {type: String, required:true, unique:true},
  tag_uses: {type: Number}
})

export const Tag = model<ITag>('Tag', tagSchema)