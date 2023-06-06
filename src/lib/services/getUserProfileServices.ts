import { IUsers } from "@/interfaces/IUsers"
import { UserDoesNotExistsError } from "./errors/userDoesNotExistsError"
import { User } from "@prisma/client"

interface getUserProfileServicesParams {
  id: string,
}

interface getUserProfileServicesResponse {
  user: User
}

export class GetUserProfileServices {
  constructor(
    private usersRepository: IUsers,
  ) { }

  async execute({ id }: getUserProfileServicesParams): Promise<getUserProfileServicesResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistsError()
    }

    return {
      user
    }
  }
}