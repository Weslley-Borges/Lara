import {ChatController} from "./ChatController"
import {ChatUseCase} from "./ChatUseCase"
import {ChatRepository, VerifyMessageRepository} from "./ChatRepository"

const chatRepository = new ChatRepository()
const verifyMessageRepository = new VerifyMessageRepository()
const chatUseCase = new ChatUseCase(chatRepository, verifyMessageRepository)
const chatController = new ChatController(chatUseCase)

export {chatController}