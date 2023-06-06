import { PrismaCategoriesRepository } from "@/repositories/prisma/prismaCategoriesRepository";
import { CreateCategoryServices } from "../services/createCategoryServices";


export function makeCreateCategoryServices() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const service = new CreateCategoryServices(categoriesRepository)

  return service
}