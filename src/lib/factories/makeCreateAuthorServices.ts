import { PrismaAuthorsRepository } from "@/repositories/prisma/prismaAuthorsRepository";
import { CreateAuthorServices } from "../services/createAuthorServices";

export function makeCreateAuthorServices() {
  const authorsRepository = new PrismaAuthorsRepository()
  const service = new CreateAuthorServices(authorsRepository)

  return service
}