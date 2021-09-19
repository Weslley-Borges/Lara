import { messages, taskLogger, connect_mongo } from '@config'
import { actions, send_response } from '@helpers'
import { Telegraf } from 'telegraf'
import chalk from 'chalk'
 

export const bot = ((): Telegraf => {
  console.clear()
  console.log(chalk.cyan(messages.lara_logo))
  console.log(
    '[+] V0.0.3 Alpha - \'POOling\'\n'+
    '[+] by Weslley Borges\n')
  connect_mongo()
  
  return process.argv.includes('test')
    ? new Telegraf(String(process.env.BOT_TOKEN_TEST))
    : new Telegraf(String(process.env.BOT_TOKEN))
})()

bot.telegram.getMe().then(() => taskLogger.log_step('⚙️','Init', 'END', 'Lara Iniciada com sucesso'))
bot.start(ctx => send_response(ctx,[{text: messages.lara_start}]))
bot.launch({dropPendingUpdates: true})

actions(bot)

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))