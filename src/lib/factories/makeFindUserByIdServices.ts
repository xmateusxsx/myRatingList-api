import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { FindUserByIdServices } from "../services/findUserByIdServices";

export function makeFindUserByIdServices() {
  const usersRepository = new PrismaUserRepository()
  const service = new FindUserByIdServices(usersRepository)

  return service
}