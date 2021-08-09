import { ITranslationProvider } from "../../dtos/providers"
import { IamAuthenticator } from "ibm-watson/auth"
import LanguageTranslatorV3 from "ibm-watson/language-translator/v3"


class IBMLanguageTranslationProvider implements ITranslationProvider {
  private readonly instance = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: String(process.env.IBM_TRANSLATE_APIKEY)||" "
    }),
    serviceUrl: String(process.env.IBM_TRANSLATE_HOST)||" "
  })


  public async translate(text:any, translateMethod:string): Promise<string> {
    const translate = await this.instance.translate({text:text, modelId:translateMethod})
    return translate.result.translations[0].translation
  }
  public async identifyLanguage(text:any): Promise<any> {
    const result = await this.instance.identify(text)
    return result.result.languages
  }
}

export const ibmTranslationProvider = new IBMLanguageTranslationProvider