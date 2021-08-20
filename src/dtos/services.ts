export module Response {
  export type Message = {
    text?: string
    chat?: string
    image?: any
    markup?: any
  }
  export type Verification = {
    messages: Message[]
    malicious: boolean
  }
}

export module Command {
  export type Status = {
    args: string[]
    command: Command.Profile|undefined
    is_adm: boolean
    error_message: string
  }
  export type Profile = {
    name: string
    path: string
    status:"COMMON"|"ADM"
    emoji: string
    description: string
    about: string
    arguments: {index:number, error:string}[]|[]
  }
  export type Process = {
    args:string[],
    command:Command.Profile,
    error_message:string
  }
}

export interface IOptionsDTO {
  field: "group_tags"|"group_links"|"group_welcome",
  method: string|null,
  value:any
}