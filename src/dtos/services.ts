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

export interface IOptionsDTO {
  field: 'group_tags'|'group_links'|'group_welcome'
  method: string|null
  value:any
}