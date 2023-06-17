import { PrismaRatingsRepository } from "@/repositories/prisma/prismaRatingsRepository";
import { GetRecentRatingsServices } from "../services/getRecentRatingsServices";

export function makeGetRecentRatingsServices() {
    const ratingsRepository = new PrismaRatingsRepository()
    const service = new GetRecentRatingsServices(ratingsRepository)

    return service
}