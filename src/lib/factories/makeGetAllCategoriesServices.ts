import { PrismaCategoriesRepository } from "@/repositories/prisma/prismaCategoriesRepository";
import { getAllCategoriesServices } from "../services/getAllCategoriesServices";

export function makeGetAllCategoriesServices() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const service = new getAllCategoriesServices(categoriesRepository)

  return service
}