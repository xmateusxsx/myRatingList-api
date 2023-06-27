import { PrismaFollowsRepository } from "@/repositories/prisma/prismaFollowsRepository";
import { GetWhoIFollowServices } from "../services/getWhoIFollowServices";

export function makeGetWhoIFollowServices() {
  const followsRepository = new PrismaFollowsRepository()
  const service = new GetWhoIFollowServices(followsRepository)

  return service
}