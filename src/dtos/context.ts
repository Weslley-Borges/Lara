import { Context } from 'telegraf'


export interface LaraContext extends Context {
  myProp?: string
  myOtherProp?: number
}