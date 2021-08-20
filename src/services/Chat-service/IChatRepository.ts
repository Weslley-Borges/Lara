import { Response } from "@dtos";

export interface IChatRepository {
  get_response: (ctx:any) => Promise<Response.Message[]>
}