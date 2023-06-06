import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository";
import { CreateWorkServices } from "../services/createWorkServices";

export function makeCreateWorkServices() {
  const worksRepository = new PrismaWorksRepository()
  const service = new CreateWorkServices(worksRepository)

  return service
}