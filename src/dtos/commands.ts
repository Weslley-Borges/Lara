import { Context } from 'grammy'


export interface Command {
  name: string
  role: string
  emoji: string
  description: string
  arguments: {
    type:string
    index?:number,
    error:string
  }[]

  execute: (ctx:Context, args:string[]) => any
}