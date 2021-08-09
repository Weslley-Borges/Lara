import { Document, Schema, Model, model } from "mongoose"


export interface IScraping extends Document {
  site_name: String
  type: String
  daily_offerts: Number
  daily_searchs: Number
  weekly_offerts: Number[]
  weekly_searchs: Number[]
  monthly_offerts: Number[]
  monthly_searchs: Number[]
  search: [string, string][]
}
const scrapingSchema = new Schema(
  {
    site_name: {type:String, required:true},
    type: {type:String, required:true},
    daily_offerts: {type:Number, required:true},
    daily_searchs: {type:Number, required:true},
    weekly_offerts: {type:Array, required:true},
    weekly_searchs: {type:Array, required:true},
    monthly_offerts: {type:Array, required:true},
    monthly_searchs: {type:Array, required:true},
    search: {type:Array, required:true}
  },
  {_id: false, autoIndex: false }
)


export const Scraping: Model<IScraping> = model('scraping_websites', scrapingSchema)