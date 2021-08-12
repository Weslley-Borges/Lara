import {ChatController} from "./ChatController"
import {ChatUseCase} from "./ChatUseCase"
import {ChatRepository} from "./ChatRepository"

const chatRepository = new ChatRepository()
const chatUseCase = new ChatUseCase(chatRepository)
export const chatController = new ChatController(chatUseCase)