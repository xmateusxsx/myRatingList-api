import { PrismaRatingsRepository } from "@/repositories/prisma/prismaRatingsRepository";
import { PrismaUserRepository } from "@/repositories/prisma/prismaUsersRepository";
import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository";
import { CreateRatingServices } from "../services/createRatingServices";

export function makeCreateRatingServices() {
  const ratingsRepository = new PrismaRatingsRepository()
  const worksRepository = new PrismaWorksRepository()
  const usersRepository = new PrismaUserRepository()
  const service = new CreateRatingServices(ratingsRepository, worksRepository, usersRepository)

  return service
}