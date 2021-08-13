import { IJoining, Joining } from "@database"


class JoiningController {
  async insert_one(user_id:Number, group_id:Number): Promise<void> {
    await Joining.create({user_id:user_id, group_id:group_id})
  }

  async delete_one(user_id:Number, group_id:Number): Promise<void> {
    await Joining.deleteMany({user_id:user_id, group_id:group_id})
  }

  async find_join_verifications(): Promise<IJoining[]|null> {
    return await Joining.find().exec()
  }
}

export const joiningController = new JoiningController