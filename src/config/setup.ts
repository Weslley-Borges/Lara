import { TaskLogger } from "@helpers"
import { Telegraf } from "telegraf"
import readline from "readline"
import mongoose from "mongoose"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config();


const env = process.env

export const possibleConnections = {
  localDB: {
    mongo: {
      url: `mongodb://localhost:${env.MONGO_PORT_TEST}`
    }
  },
  prodDB: {
    mongo: {
      url: `mongodb://${env.MONGO_USERNAME_PROD}:${env.MONGO_PASSWORD_PROD}@${env.MONGO_HOST_PROD}`
    }
  }
}
export async function connect(data:any) {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(data.mongo.url)
    .then(result => {
      new TaskLogger().logStep('✅','DATABASE', 'END', 'Banco de dados iniciado com sucesso')
    })
    .catch(error => {
      console.log(error)
      new TaskLogger().logStep('❌','DATABASE', 'ERROR', 'Falha ao iniciar banco de dados!!')
    })
}


export const bot = ((): Telegraf => {
  console.clear()
  switch (process.argv[2]) {
    case "test": 
      process.argv[2] = "testes"
      return new Telegraf(String(env.BOT_TOKEN_TEST))
    default:
      process.argv[2] = "produção"
      return new Telegraf(String(env.BOT_TOKEN))
  }
})()

export const greetings = JSON.parse(String(fs.readFileSync("./src/config/greetings.json")))
export const prefix = "!"
export const taskLogger = new TaskLogger