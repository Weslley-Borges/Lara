/* eslint-disable quotes */
import { messages, taskLogger, connect_mongo } from '@config'
import { actions, send_response } from '@helpers'
import { Bot } from 'grammy'
import chalk from 'chalk'
 

export const bot = ((): Bot => {
  console.clear()
  console.log(chalk.cyan(messages.lara_logo))
  console.log(
    '[+] V0.0.3 Alpha - \'POOling\'\n'+
    '[+] by Weslley Borges\n')
  connect_mongo()
  
  return process.argv.includes('test')
    ? new Bot(String(process.env.BOT_TOKEN_TEST))
    : new Bot(String(process.env.BOT_TOKEN))
})()


bot.api.getMe().then(() => taskLogger.log_step('⚙️','Init', 'END', 'Lara Iniciada com sucesso'))
bot.command("start", ctx => send_response(ctx,[{text: messages.lara_start}]))
bot.start({drop_pending_updates: true})
  
actions(bot)