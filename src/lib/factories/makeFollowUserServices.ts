import { PrismaFollowsRepository } from "@/repositories/prisma/prismaFollowsRepository";
import { FollowUserServices } from "../services/followUserServices";

export function makeFollowUserServices() {
  const followsRepository = new PrismaFollowsRepository()
  const service = new FollowUserServices(followsRepository)

  return service
}