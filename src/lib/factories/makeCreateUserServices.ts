import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { CreateUserServices } from "../services/createUserServices";

export function makeCreateUserServices() {
  const usersRepository = new PrismaUserRepository()
  const service = new CreateUserServices(usersRepository)

  return service
}