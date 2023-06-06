import { IUsers } from "@/interfaces/IUsers"
import { UserDoesNotExistsError } from "./errors/userDoesNotExistsError"

interface findUserByNameParams {
  name: string,
}

export class FindUserByNameServices {
  constructor(
    private usersRepository: IUsers,
  ) { }

  async execute({ name }: findUserByNameParams) {

    const user = await this.usersRepository.findByName(name)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    return user
  }
}