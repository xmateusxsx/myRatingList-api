import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError"
import { IUsers } from "@/interfaces/IUsers"

interface createUserServicesParams {
  name: string,
  email: string,
  avatar: string,
  password: string,
}

export class CreateUserServices {
  constructor(
    private usersRepository: IUsers,
  ) { }

  async execute({ name, email, avatar, password }: createUserServicesParams) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSameName = await this.usersRepository.findByName(name)

    if (userWithSameEmail || userWithSameName) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      avatar,
      password: password_hash
    })
  }
}