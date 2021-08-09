export interface ITranslationProvider {
  translate(text:string, translateMethod:string): Promise<string>
  identifyLanguage(text:string): any
}

export interface ISpeechToTextProvider {
  to_speech: (text:string) => Promise<string>
}