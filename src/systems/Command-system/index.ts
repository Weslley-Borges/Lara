import { CommandController } from "./CommandController"
import { CommandUseCase } from "./CommandUseCase"
import { CommandRepository } from "./CommandRepository"

const commandRepository = new CommandRepository
const commandUseCase = new CommandUseCase(commandRepository)
const commandController = new CommandController(commandUseCase)

export {commandController}