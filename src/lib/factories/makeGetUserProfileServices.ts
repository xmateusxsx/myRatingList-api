import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { GetUserProfileServices } from "../services/getUserProfileServices";

export function makeGetUserProfileServices() {
  const usersRepository = new PrismaUserRepository()
  const service = new GetUserProfileServices(usersRepository)

  return service
}