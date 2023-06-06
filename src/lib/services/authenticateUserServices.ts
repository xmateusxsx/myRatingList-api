import { IUsers } from "@/interfaces/IUsers";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalidCredentialsError";
import { compare } from "bcryptjs";

interface AuthenticateUserServicesParams {
  email: string,
  password: string
}

interface AuthenticateUserServicesResponse {
  user: User
}

export class AuthenticateUserServices {
  constructor(
    private usersRepository: IUsers
  ) { }

  async execute({ email, password }: AuthenticateUserServicesParams): Promise<AuthenticateUserServicesResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }

  }
}