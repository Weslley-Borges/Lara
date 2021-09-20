import { aboutCommand } from './commons/about'
import { banCommand } from './administration/ban'
import { googleCommand } from './search/google'
import { menuCommand } from './commons/menu'
import { youtubeCommand } from './search/youtube'


export const commands = [
  menuCommand,
  aboutCommand,
  banCommand,
  googleCommand,
  youtubeCommand
]