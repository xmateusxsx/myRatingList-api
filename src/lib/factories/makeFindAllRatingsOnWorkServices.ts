import { PrismaRatingsRepository } from "@/repositories/prisma/prismaRatingsRepository";
import { FindAllRatingsOnWorkServices } from "../services/findAllRatingsOnWorkServices";

export function makeFindAllRatingsOnWorkServices() {
  const ratingsRepository = new PrismaRatingsRepository()
  const service = new FindAllRatingsOnWorkServices(ratingsRepository)

  return service
}