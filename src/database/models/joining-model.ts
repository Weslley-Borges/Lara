import { Schema, model } from "mongoose"


export interface IJoining {
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


export const Joining = model<IJoining>('Joining_verifications', joiningSchema)