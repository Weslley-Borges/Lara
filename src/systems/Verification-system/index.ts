import { VerificationController } from "./VerificationController"
import { VerificationUseCase } from "./VerificationUseCase"
import { VerificationRepository } from "./VerificationRepository"

export const verificationRepository = new VerificationRepository
export const verificationUseCase = new VerificationUseCase(verificationRepository)
export const verificationController = new VerificationController(verificationUseCase)