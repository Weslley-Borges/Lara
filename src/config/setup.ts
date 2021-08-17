import { Telegraf } from "telegraf"
import { TaskLogger } from "../helpers"
import mongoose from "mongoose"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config();


(async () => {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(String(process.env.PROD_DATABASE))
})()


function initialize_bot(): Telegraf { 
  switch (process.argv[2]) {
    case "test": 
      process.argv[2] = "testes"
      return new Telegraf(String(process.env.BOT_TOKEN_TEST))
    default:
      process.argv[2] = "produção"
      return new Telegraf(String(process.env.BOT_TOKEN))
  }
}


export const greetings = JSON.parse(String(fs.readFileSync("./src/config/greetings.json")))
export const bot = initialize_bot()
export const prefix = "!"
export const taskLogger = new TaskLogger