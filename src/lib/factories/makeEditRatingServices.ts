import { PrismaRatingsRepository } from "@/repositories/prisma/prismaRatingsRepository";
import { EditRatingServices } from "../services/editRatingServices";

export function makeEditRatingServices() {
  const ratingsRepository = new PrismaRatingsRepository()
  const service = new EditRatingServices(ratingsRepository)

  return service
}