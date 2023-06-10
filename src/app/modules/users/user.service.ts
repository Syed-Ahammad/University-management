import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utility'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const Id = await generateUserId()
  user.id = Id

  // default user password
  if (!user.password) {
    user.password = config.DefaultUserPass as string
  }
  if (!createUser) {
    throw new Error('User creation failed')
  }
  const createdUser = await User.create(user)
  return createdUser
}

export const UserService = {
  createUser,
}
