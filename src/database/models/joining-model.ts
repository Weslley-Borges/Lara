import { Schema, model, Model, Document } from "mongoose"


export interface IJoining extends Document {
  user_id: Number
  group_id: Number
  joined_at: Date
}

const joiningSchema = new Schema(
  {
    user_id: {type:Number, required:true},
    group_id: {type:Number, required:true},
    joined_at: {type:Date, default: Date.now()}
  },
  {_id: false, autoIndex: false }
)


export const Joining: Model<IJoining> = model('joining_verifications', joiningSchema)