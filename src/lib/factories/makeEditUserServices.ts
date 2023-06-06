import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { EditUserServices } from "../services/editUserServices";

export function makeEditUserServices() {
  const usersRepository = new PrismaUserRepository()
  const service = new EditUserServices(usersRepository)

  return service
}