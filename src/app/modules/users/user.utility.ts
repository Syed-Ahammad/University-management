import { User } from './user.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: -1 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || String(0).padStart(6, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(6, '0')

  return incrementId // Return the generated ID with a prefix
}
