export module Response {
  export type Message = {
    text?: string
    chat?: string|number
    image?: any
    markup?: any
  }
  export type Result = {
    messages: Message[]|string[]
    send_many: boolean
    malicious?: boolean
  }
  export type Verification = {
    messages: Message[]
    malicious: boolean
  }
}

export module Command {
  export type Status = {
    type: "FOUND"|"NOT FOUND"
    args: string[]
    name: string
    command: Command.Profile|undefined
    is_adm: boolean
    adm_func: boolean|undefined
    error_message: string
  }
  export type Profile = {
    name: string
    path: string
    emoji: string
    description: string
    arguments: {index:number, error:string}[]
  }
  export type Process = {
    args:string[],
    command:Command.Profile,
    error_message:string
  }
}