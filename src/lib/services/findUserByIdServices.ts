import { IUsers } from "@/interfaces/IUsers"
import { UserDoesNotExistsError } from "./errors/userDoesNotExistsError"

interface findUserByIParams {
  user_id: string,
}

export class FindUserByIdServices {
  constructor(
    private usersRepository: IUsers,
  ) { }

  async execute({ user_id }: findUserByIParams) {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    return user
  }
}