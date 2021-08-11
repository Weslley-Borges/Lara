import { Schema, model, Model, Document } from "mongoose"


export interface IGroup extends Document {
  group_id:Number
  group_welcome:String
  group_links:{text:String, url:String}[]
  group_tags:String[]
  group_members: {id:Number, messages_count:Number, last_update:Date}[]
  group_preferences: {name:String, status:boolean}[]
  group_last_update:Date
}

const groupSchema = new Schema(
  {
    group_id: {type:Number, required:true},
    group_welcome: {type:String, default:"Seja bem-vindo(a), MEMBER!"},
    group_links: {type:Array, default:[{text:"Suporte do Bot", url:"https://t.me/laraSuporte"}]},
    group_tags: {type:Array, default:[]},
    group_members: {type:Array, default:[]},
    group_preferences: {type:Array, default:[{name:"Interact", status:true}]},
    group_last_update: {type:Date, default:new Date()}
  },
  {_id: false, autoIndex: false }
)

export const Group: Model<IGroup> = model('groups', groupSchema)