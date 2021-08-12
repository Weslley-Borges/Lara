import { Schema, model } from "mongoose"


export interface IUser {
  user_id: Number
  user_description: String
}

const userSchema = new Schema<IUser>(
  {
    user_id: {type:Number, required:true, unique:true},
    user_description: {type:String, default:"Cadastrado(a) na Lara."},
  },
  {_id: false, autoIndex: false }
)

export const User = model<IUser>('User', userSchema)