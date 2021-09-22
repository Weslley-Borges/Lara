import { Context } from 'grammy'


export interface LaraContext extends Context {
  myProp?: string
  myOtherProp?: number
}