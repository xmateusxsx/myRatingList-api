import { PrismaFollowsRepository } from "@/repositories/prisma/prismaFollowsRepository";
import { UnfollowUserServices } from "../services/unfollowUserServices";

export function makeUnfollowUserServices() {
  const followsRepository = new PrismaFollowsRepository()
  const service = new UnfollowUserServices(followsRepository)

  return service
}