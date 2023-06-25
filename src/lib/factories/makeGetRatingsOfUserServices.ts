import { PrismaRatingsRepository } from "@/repositories/prisma/prismaRatingsRepository";
import { GetRatingsOfUserServices } from "../services/getRatingsOfUserServices";

export function makeGetRatingsOfUserServices() {
  const ratingsRepository = new PrismaRatingsRepository()
  const service = new GetRatingsOfUserServices(ratingsRepository)

  return service
}