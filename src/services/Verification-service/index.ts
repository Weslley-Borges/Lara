import { VerificationController } from "./VerificationController"
import { VerificationUseCase } from "./VerificationUseCase"
import { VerificationRepository } from "./VerificationRepository"

const verificationRepository = new VerificationRepository
const verificationUseCase = new VerificationUseCase(verificationRepository)
export const verificationController = new VerificationController(verificationUseCase)