import { messages } from "@config"
import { Response } from "@dtos"
import { joiningController, groupController } from "@database"


export async function add_join_verification(ctx:any): Promise<Response.Message[]> {
  const member = ctx.update.message.new_chat_participant
  if (member.is_bot) return [{text:"Olha só... outro bot!"}]

  await joiningController.insert_one(member.id, ctx.chat.id)
  return [{text: messages.member_join.replace("PERSON", member.first_name)}]
}

export async function validate_join_verification(ctx:any): Promise<Response.Message[]|undefined> {
  const verifications = await joiningController.find_join_verifications()
  if (!verifications) return

  for (let x=0; x < verifications.length; x++) {
    if (verifications[x].group_id === ctx.chat.id && verifications[x].user_id === ctx.from.id) {
      await joiningController.delete_one(ctx.from.id, ctx.chat.id)

      return await groupController
        .find_one(ctx.chat.id)
        .then(group => {
          if (!group) return

          const message = group.group_welcome.replace("MEMBER", ctx.from.first_name)  
          const links = group.group_links.map(link => {return [link]})
          return [{message:message, markup:{inline_keyboard:links}}]
        })
    }
  }
}