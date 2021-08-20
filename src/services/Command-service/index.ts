import { CommandController } from "./CommandController"
import { CommandUseCase } from "./CommandUseCase"
import { CommandRepository } from "./CommandRepository"

const commandRepository = new CommandRepository
const commandUseCase = new CommandUseCase(commandRepository)
export const commandController = new CommandController(commandUseCase)