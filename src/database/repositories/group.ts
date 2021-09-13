import { group, IGroup} from '@database'
import { taskLogger } from '@config'


class GroupController {
  async find_all(): Promise<IGroup[]|null> {
    return await group.find().exec()
  }
  async find_one(group_id:number): Promise<IGroup|null> {
    return await group.findOne({group_id: group_id}).exec()
  }
  async delete_one(group_id:number): Promise<void> {
    await group.deleteOne({group_id: group_id})
  }

  async register_group(group_id:number): Promise<boolean> {
    if (await group.findOne({group_id: group_id})) return false

    return await group.create({group_id: group_id}).then(() => {
      taskLogger.log_step('🎉','New group', 'END', `O grupo ${group_id} foi registrado!`)
      return true
    })
  }
}
export const groupController = new GroupController