import { PrismaFollowsRepository } from "@/repositories/prisma/prismaFollowsRepository";
import { getMyFollowersServices } from "../services/getMyFollowersServices";

export function makeGetMyFollowersServices() {
  const followsRepository = new PrismaFollowsRepository()
  const service = new getMyFollowersServices(followsRepository)

  return service
}