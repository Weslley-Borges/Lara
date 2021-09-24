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