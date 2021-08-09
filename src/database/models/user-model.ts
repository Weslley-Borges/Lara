import { Schema, model, Model, Document } from "mongoose"


export interface IUser extends Document {
  user_id: Number
  user_description: String
  user_preferences: {likes:Number[], dislike:Number[]}
}

const preferencesSchema = new Schema({
  like: {type:Array, default:[]},
  dislike: {type:Array, default:[]}
})

const userSchema = new Schema(
  {
    user_id: {type:Number, required:true},
    user_description: {type:String, default:"Cadastrado(a) na Lara."},
    user_preferences: preferencesSchema
  },
  {_id: false, autoIndex: false }
)

export const User: Model<IUser> = model('users', userSchema)