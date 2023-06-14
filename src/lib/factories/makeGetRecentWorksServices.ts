import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository";
import { GetRecentWorksServices } from "../services/getRecentWorksServices";

export function makeGetRecentWorksServices() {
  const worksRepository = new PrismaWorksRepository();
  const service = new GetRecentWorksServices(worksRepository)

  return service
}