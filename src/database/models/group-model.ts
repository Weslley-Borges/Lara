import { Schema, model, Document } from "mongoose"


export interface IOptions {
  option_name:String
  option_status:Boolean
}
export interface IMember {
  id:Number
  messages_count:Number
  last_update:Date
}
export interface IGroup extends Document {
  group_id:Number
  group_welcome:String
  group_links:{text:String, url:String}[]
  group_tags:String[]
  group_members: IMember[]
  group_options: IOptions[]
  group_last_update:Date
}

const optionsSchema = new Schema({
  option_name: {type:String, required:true},
  option_status: {type:Boolean, default:true}
})

const memberSchema = new Schema({
  id: {type:Number, required:true, ref:"User"},
  messages_count: {types:Number, default:0},
  last_update: {type:Date, default:new Date()},
  warns: {type:Number, deafult:0}
})

const groupSchema = new Schema<IGroup>({
  group_id: {type:Number, required:true},
  group_welcome: {type:String, default:"Seja bem-vindo(a), PERSON!"},
  group_links: {type:Array, default:[{text:"Suporte do Bot", url:"https://t.me/laraSuporte"}]},
  group_tags: {type:Array, default:[], ref:"Tag"},
  group_members: [memberSchema],
  group_options: [optionsSchema],
  group_last_update: {type:Date, default:new Date()}
})

export const Group = model<IGroup>('Group', groupSchema)