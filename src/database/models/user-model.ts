import { Schema, model, Document } from "mongoose"


export interface IUser extends Document{
  user_id: Number
  user_description: String
}

const userSchema = new Schema<IUser>({
  user_id: {type:Number, required:true, unique:true},
  user_description: {type:String, default:"Cadastrado(a) na Lara."},
})

export const User = model<IUser>('User', userSchema)