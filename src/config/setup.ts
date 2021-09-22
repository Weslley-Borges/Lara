import { TaskLogger } from '@helpers'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()


const env = process.env

const possibleConnections = {
  localDB: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  prodDB: `mongodb://${env.MONGO_USERNAME_PROD}:${env.MONGO_PASSWORD_PROD}@${env.MONGO_HOST_PROD}`
}

export async function connect_mongo() {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)

  const url = process.argv.includes('--db-test') || process.argv.includes('test')
    ? possibleConnections.localDB : possibleConnections.localDB

  await mongoose.connect(url)
    .then(() => new TaskLogger().log_step('✅','DATABASE', 'END', 'Banco de dados iniciado com sucesso'))
    .catch(() => new TaskLogger().log_step('❌','DATABASE', 'ERROR', 'Falha ao iniciar banco de dados!!'))
}


export const prefix = '!'
export const taskLogger = new TaskLogger
export const greetings = JSON.parse(String(fs.readFileSync('src/config/greetings.json')))