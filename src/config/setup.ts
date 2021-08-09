import { Telegraf } from "telegraf"
import { messages } from "./"
import { config } from "dotenv"
import chalk from "chalk"
config()


function initialize_bot(): Telegraf {
  console.log(chalk.cyan(messages.lara_logo+"\n"))
  
  switch (process.argv[2]) {
    case "test": 
      process.argv[2] = "testes"
      process.argv[3] = String(process.env.TEST_DATABASE)
      return new Telegraf(String(process.env.BOT_TOKEN_TEST))
    default:
      process.argv[2] = "produção"
      process.argv[3] = String(process.env.PROD_DATABASE)
      return new Telegraf(String(process.env.BOT_TOKEN))
  }
}

export const bot = initialize_bot()
export const prefix = "!"