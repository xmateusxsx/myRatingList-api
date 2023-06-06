import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { AuthenticateUserServices } from "../services/authenticateUserServices";

export function makeAuthenticateUserServices() {
  const usersRepository = new PrismaUserRepository()
  const service = new AuthenticateUserServices(usersRepository)

  return service
}