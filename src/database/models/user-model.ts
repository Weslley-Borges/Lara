import { Schema, model, Model, Document } from "mongoose"


export interface IUser extends Document {
  user_id: Number
  user_description: String
}

const userSchema = new Schema(
  {
    user_id: {type:Number, required:true},
    user_description: {type:String, default:"Cadastrado(a) na Lara."},
  },
  {_id: false, autoIndex: false }
)

export const User: Model<IUser> = model('User', userSchema)