import { PrismaWorksRepository } from "@/repositories/prisma/prismaWorksRepository";
import { GetTopRatedWorksOfMonth } from "../services/getTopRatedWorksOfMonth";

export function makeGetTopRatedWorksOfMonthServices() {
    const worksRepository = new PrismaWorksRepository()
    const service = new GetTopRatedWorksOfMonth(worksRepository)

    return service
}