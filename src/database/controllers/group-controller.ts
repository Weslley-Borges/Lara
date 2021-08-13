import { User, IUser, Group, IGroup} from "@database"
import { taskLogger } from "@config"
import { IOptionsDTO } from "@dtos"


class GroupController {
  async find_all(): Promise<IGroup[]|null> {
    return await Group.find().exec()
  }
  async find_one(group_id:number): Promise<IGroup|null> {
    return await Group.findOne({group_id: group_id}).exec()
  }
  async delete_one(group_id:number): Promise<void> {
    await Group.deleteOne({group_id: group_id})
  }

  async insert_one(group_id:number): Promise<String> {
    return await Group.findOne({group_id: group_id})
      .exec()
      .then((result) => {
        if (result == null) return "Esse grupo já existe no meu sistema."

        Group.create({group_id: group_id})
        taskLogger.logStep('🎉','New Group', 'END', `O grupo ${group_id} foi registrado!`)
        return "<b>Parabéns!</b> O grupo está registrado no meu sistema!"
      })
  }

  async edit_group(group_id:number, options:IOptionsDTO): Promise<String> {    
    return await Group
      .findOne({group_id: group_id})
      .exec()
      .then(async (group) => {
        if (group == null) return "Esse grupo não está registrado no meu sistema."

        const value = options.value

        if (options.field in ["group_links", "group_tags"]) {
          let data = options.field == "group_links"
            ? group.group_links
            : group.group_tags

          if (options.method == "ADD") data.push(options.value)
          else if (options.method == "REMOVE") data = remove_element(data, Number(value))

          if (options.field == "group_links" ) {
            data = data as {text:String, url:String}[]
            await Group.updateOne({group_id:group_id}, {group_links:data})
          } else {
            data = data as String[]
            await Group.updateOne({group_id:group_id}, {group_tags:data})
          }
        } else if (options.field == "group_welcome") {
          await Group.updateOne({group_id:group_id}, {group_greetings:value})
          return "Mensagem de boas-vindas editada com sucesso!"
        }
        return "Esse campo não existe"
      })
    
    function remove_element(array:any[], value:number): any[] {
      try {
        return array.splice(value, 1) 
      } catch(error) { return array }
    }
  }
}
export const groupController = new GroupController


class GroupChatController {
  public async evaluate_message(group_id:Number, member_id:Number): Promise<void> {
    await Group
      .findOne({group_id: group_id})
      .exec()
      .then(async (group:IGroup|null) => {
        if (group == null) return

        await User
          .findOne({user_id: member_id})
          .exec()
          .then(async (member:IUser|null) => {
            if (member == null) return

            let members = group.group_members
            const my_member = members.find(user => user.id == member_id)
            if (my_member == undefined) members.push({id: member_id, messages_count:1, last_update:new Date()})
            else members.forEach((member: any) => { if (my_member.id == member[0]) member[1] += 1 })

            await Group
              .updateOne(
                {group_id: group_id},
                {"$set": {group_members:members, group_last_update:new Date()}})
              .exec()
          })
      })
  }
}
export const groupChatController = new GroupChatController