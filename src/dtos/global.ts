module Response {
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
}