import { Response, Command } from "@dtos"

export interface ICommandRepository {
  verify_args(command:Command.Profile, args:any): string
  return_result(ctx:any, data:Command.Process): Response.Message[]|string[]
  get_status(ctx:any): Promise<Command.Status>
}
