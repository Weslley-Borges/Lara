import { IJoining, Joining, groupController } from "@database"
import { messages } from "@config"
import { Response } from "@dtos"


class JoiningController {
  async insert_one(user_id:Number, group_id:Number): Promise<void> {
    await Joining.create({user_id:user_id, group_id:group_id})
  }

  async delete_one(user_id:Number, group_id:Number): Promise<void> {
    await Joining.deleteMany({user_id:user_id, group_id:group_id})
  }

  async find_all(): Promise<IJoining[]|null> {
    return await Joining.find().exec()
  }

  async find_one(user_id:Number, group_id:Number): Promise<IJoining|null> {
    return await Joining.findOne({user_id:user_id, group_id:group_id}).exec()
  }

  async create(ctx:any): Promise<Response.Message[]> {
    const member = ctx.update.message.new_chat_participant
    if (member.is_bot) return [{text:"Olha só... outro bot!"}]

    await this.insert_one(member.id, ctx.chat.id)
    return [{text: messages.member_join.replace("PERSON", member.first_name)}]
  }

  async validate(ctx:any): Promise<Response.Message[]|undefined> {
    if (!(await this.find_one(ctx.from.id, ctx.chat.id))) return

    await this.delete_one(ctx.from.id, ctx.chat.id)
    return await groupController
      .find_one(ctx.chat.id)
      .then(group => {
        if (!group) return

        const links = group.group_links.map(link => {return [link]})
        return [{message:group.group_welcome, markup:{inline_keyboard:links}}]
      })
  }
}

export const joiningController = new JoiningController