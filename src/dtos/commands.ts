export interface Command {
  name: string
  role: string
  emoji: string
  description: string
  arguments: {index:number, error:string}[]

  execute: (ctx:any, args:string[]) => any
}