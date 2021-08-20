import { Schema, model, Document } from "mongoose"


export interface IJoining extends Document{
  user_id: Number
  group_id: Number
}

const joiningSchema = new Schema(
  {
    user_id: {type:Number, required:true},
    group_id: {type:Number, required:true}
  }, {
    timestamps:true
  }
)


export const Joining = model<IJoining>('Joining_verifications', joiningSchema)