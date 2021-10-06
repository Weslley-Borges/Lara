import { Schema, model, Document, Model } from 'mongoose'


export interface IUser extends Document {
  user_id: Number
  user_about: String
  user_last_update: Date
}

const userSchema = new Schema<IUser>({
  user_id: {
    type: Number,
    required: true

  },
  user_about: {
    type: String,
    default: 'Registrado no sistema Lara'

  },
  user_last_update: {
    type: Date, 
    default: new Date()

  }
})

export const user: Model<IUser> = model('users', userSchema)