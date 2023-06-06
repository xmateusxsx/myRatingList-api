import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { FindUserByNameServices } from "../services/findUserByNameServices";

export function makeFindUserByNameServices() {
  const usersRepository = new PrismaUserRepository()
  const service = new FindUserByNameServices(usersRepository)

  return service
}