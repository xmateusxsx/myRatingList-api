import { GetAverageOfWorkServices } from "../services/getAverageOfWorkServices";
import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository";

export function makeGetAverageOfWorkServices() {
  const worksRepository = new PrismaWorksRepository()
  const service = new GetAverageOfWorkServices(worksRepository)

  return service
}