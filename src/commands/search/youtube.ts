import { Command } from '@dtos'
import { Context } from 'grammy'


class YouTube implements Command {
  name = 'youtube'
  role = 'COMMON'
  emoji = '🎥'
  description = 
    'Pesquisa no Youtube.\n\n'+
    '<b>Exemplo:</b> PREFIXyoutube como comprar os produtos Ivone'
  arguments = [{type:'text', index: 0, error: 'Você precisa colocar o que quer pesquisar'}]
  example_image = 'assets/img/YouTube.png'

  
  async execute(ctx:Context, args:string[]): Promise<string[]> {
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