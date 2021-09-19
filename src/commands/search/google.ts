import { Command } from '@dtos'


class Google implements Command {
  public name = 'google'
  public role = 'COMMON'
  public emoji = '🔎'
  public description = 
    'Pesquisa no Google.\n\n'+
    '<b>Exemplo:</b> PREFIXgoogle como comprar os produtos Ivone\n\n'+
    '<u>|Dicas para melhorar a eficiência da pesquisa|</u>\n'+
    '▫️ Coloque as frases entre aspas (" ") para obter a correspondência exata\n'+
    '▫️ Anexe palavras ou frases que devem aparecer com um símbolo +.\n'+
    'Ex: +bitcoin\n\n'+
    '▫️ Anexe palavras que não devem aparecer com um símbolo -\n'+
    'Ex: -bitcoin\n\n'+
    '▫️ Alternativamente, você pode usar as palavras-chave AND / OR / NOT e, também, agrupá-las com parênteses.\n'+
    'Ex: crypto AND (ethereum OR litecoin) NOT bitcoin.'

  public arguments = [{index: 0, error: 'Você precisa colocar o que quer pesquisar'}]

  
  public async execute(ctx:any, args:string[]): Promise<string[]> {
    return await this.get_content(args.toString())
  }

  
  private async get_content(query:string): Promise<string[]> {
    const googleIt = require('google-it')
    const searchResults = query.toLowerCase().includes('pdf')
      ? await googleIt({'query':`intext:${query} filetype:pdf`, 'no-display':true, 'limit':25})
      : await googleIt({'query':query, 'no-display':true, 'limit':25})

    const result:string[] = []
    for (const content of searchResults)
      result.push(`<a href="${content.link}">${content.title.toUpperCase()}</a>`)
    return result
  }
}

export const googleCommand = new Google