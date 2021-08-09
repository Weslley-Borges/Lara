import { ITranslationProvider } from "../../dtos/providers"
import { IamAuthenticator } from "ibm-watson/auth"
import LanguageTranslatorV3 from "ibm-watson/language-translator/v3"


class IBMLanguageTranslationProvider implements ITranslationProvider {
  private readonly instance = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: String(process.env.IBM_WATSON_TRANSLATE_TOKEN)
    }),
    serviceUrl: String(process.env.IBM_WATSON_TRANSLATE_HOST)
  })

  public async translate(text:any, translateMethod:string): Promise<string> {
    return await this.instance.translate({text:text, modelId:translateMethod})
      .then(translate => {return translate.result.translations[0].translation})
  }
  public async identifyLanguage(text:any): Promise<any> {
    return await this.instance.identify(text)
      .then(process => {return process.result.languages})
  }
}

export const ibmProvider = new IBMLanguageTranslationProvider