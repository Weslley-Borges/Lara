import { TaskLogger } from "@helpers"
import { Telegraf } from "telegraf"
import { messages } from "@config"
import mongoose from "mongoose"
import dotenv from "dotenv"
import chalk from "chalk"
dotenv.config()


const env = process.env

export const possibleConnections = {
  localDB: `mongodb://localhost:${env.MONGO_PORT_LOCAL}`,
  prodDB: `mongodb://${env.MONGO_USERNAME_PROD}:${env.MONGO_PASSWORD_PROD}@${env.MONGO_HOST_PROD}`
}

export async function connect_mongoDB(mongo_url:any) {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(mongo_url)
    .then(result => {
      new TaskLogger().logStep('✅','DATABASE', 'END', 'Banco de dados iniciado com sucesso')
    })
    .catch(error => {
      console.error(error)
      new TaskLogger().logStep('❌','DATABASE', 'ERROR', 'Falha ao iniciar banco de dados!!')
    })
}

export const bot = ((): Telegraf => {
  console.clear()
  console.log(chalk.cyan(messages.lara_logo))
  
  switch (process.argv[2]) {
    case "test": 
      process.argv[2] = "testes"
      connect_mongoDB(possibleConnections.localDB)
      return new Telegraf(String(env.BOT_TOKEN_TEST))
    default:
      process.argv[2] = "produção"
      connect_mongoDB(possibleConnections.prodDB)
      return new Telegraf(String(env.BOT_TOKEN))
  }
})()

export const prefix = "!"
export const taskLogger = new TaskLogger