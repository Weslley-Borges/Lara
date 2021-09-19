import { Command } from '@dtos'


class YouTube implements Command {
  public name = 'youtube'
  public role = 'COMMON'
  public emoji = '🔎'
  public description = 
    'Pesquisa no Youtubr.\n\n'+
    '<b>Exemplo:</b> PREFIXyoutube como comprar os produtos Ivone'
  public arguments = [{index: 0, error: 'Você precisa colocar o que quer pesquisar'}]

  
  public async execute(ctx:any, args:string[]): Promise<string[]> {
    return await this.get_many_videos(args.toString())
  }

  
  private async get_many_videos(query:string): Promise<string[]> {
    const ytSearch = require('yt-search')
    const searchResult = await ytSearch(query)

    const result:string[] = []
    for (const vd of searchResult.videos)
      result.push(`<a href="${vd.url}">[${vd.timestamp}] ${vd.title.toUpperCase()}</a>`)

    return result
  }
}

export const youtubeCommand = new YouTube