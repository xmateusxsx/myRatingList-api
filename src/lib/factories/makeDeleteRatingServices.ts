import { PrismaRatingsRepository } from "@/repositories/prisma/prismaRatingsRepository";
import { DeleteRatingServices } from "../services/deleteRatingServices";

export function makeDeleteRatingServices() {
  const ratingsRepository = new PrismaRatingsRepository()
  const service = new DeleteRatingServices(ratingsRepository)

  return service
}