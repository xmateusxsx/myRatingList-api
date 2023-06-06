import { IUsers } from "@/interfaces/IUsers"
import { hash } from "bcryptjs"

interface editUserServicesParams {
  user_id: string,
  avatar: string,
  email: string,
  password: string
}

interface verifyUserParams {
  user_id: string
}

export class EditUserServices {
  constructor(
    private usersRepository: IUsers,
  ) { }

  async verifyUser({ user_id }: verifyUserParams) {
    const user = this.usersRepository.findById(user_id)

    return user
  }

  async execute({ user_id, avatar, email, password }: editUserServicesParams) {
    const password_hash = await hash(password, 6)

    const editThisUser = await this.usersRepository.editUser(user_id, avatar, email, password_hash)

    return editThisUser
  }
}