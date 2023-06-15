import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository";
import { GetWorkInfoServices } from "../services/getWorkInfoServices";

export function makeGetWorkInfoServices() {
  const worksRepository = new PrismaWorksRepository();
  const service = new GetWorkInfoServices(worksRepository)

  return service
}