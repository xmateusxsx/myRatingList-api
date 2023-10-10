import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository"
import { getAllWorksServices } from "../services/getAllWorksServices"


export function makeGetAllWorksServices() {
  const worksRepository = new PrismaWorksRepository()
  const service = new getAllWorksServices(worksRepository)

  return service
}