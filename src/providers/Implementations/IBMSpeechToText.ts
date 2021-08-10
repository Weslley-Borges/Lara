import { IamAuthenticator } from "ibm-watson/auth"
import { ISpeechToTextProvider } from "../../dtos/providers"
import TextToSpeech from "ibm-watson/text-to-speech/v1"
import fs from "fs"


class IBMTextToSpeechProvider implements ISpeechToTextProvider {
  private readonly textToSpeech = new TextToSpeech({
    authenticator: new IamAuthenticator({
      apikey: String(process.env.IBM_TEXT_TO_SPEECH_TOKEN)
    }),
    serviceUrl: process.env.IBM_TEXT_TO_SPEECH_HOST
  })

  public async to_speech(text:string): Promise<string> {
    return this.textToSpeech.synthesize({
      text: text,
      accept: 'audio/wav',
      voice: 'pt-BR_IsabelaVoice',

    })
    .then((response:any) => this.textToSpeech.repairWavHeaderStream(response.result))
    .then(buffer => {fs.writeFileSync(`temp/audio/asd.wav`, buffer)})
    .then(() => {return "OK"})
  }
}

export const ibmTextToSpeechProvider = new IBMTextToSpeechProvider