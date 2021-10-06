import { group, IGroup} from '@database'
import { taskLogger } from '@config'


class GroupService {
  async find_all(): Promise<IGroup[]|null> { return await group.find() }
  async find_one(group_id:number): Promise<IGroup|null> { return await group.findOne({group_id: group_id}).exec() }
  async delete_one(group_id:number): Promise<void> { await group.deleteOne({group_id: group_id}) }

  async register_group(group_id:number): Promise<void> {
    if (await group.findOne({group_id: group_id})) {
      const options = [
        {option_name:'bot_can_speak', option_status:true, option_description: 'Sistema de chat'},
        {option_name:'users_can_use_commands', option_status:true, option_description: 'Membros podem usar comandos'},
        {option_name:'use_messages_data', option_status:false, option_description: 'Contribuir para o sistema'},
      ]
  
      await group.create({group_id: group_id, options:options})
      taskLogger.log_step('🎉','New group', 'END', `O grupo ${group_id} foi registrado!`)
    }
  }

  async add_new_member(group_id:number, member_id:number) {
    const myGroup = await group.findOne({group_id: group_id})
    if (!myGroup) return await this.register_group(group_id)

    const isRegistred = myGroup.group_members.filter(member => member.id === member_id)[0] != null 
    if (!isRegistred) {
      myGroup.group_members.push({id:member_id, last_update: new Date()})
      group.updateOne({group_id:group_id}, {group_members:myGroup.group_members})
    }
  }

  async evaluate_message(group_id:number, member_id:number) {
    await this.add_new_member(group_id, member_id)
    const myGroup = await group.findOne({group_id:group_id})
    if (!myGroup) return

    const members = myGroup.group_members
    for (const member of members)
      if (member_id === member.id) {
        member.last_update = new Date()
        break
      }
      
    await group.updateOne({group_id: group_id}, {'$set': {group_members:members, group_last_update:new Date()}}).exec()
  }
}
export const groupService = new GroupService