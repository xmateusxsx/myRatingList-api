import { Prisma, Category } from "@prisma/client";

export interface ICategories {
  create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>

  findByName(name: string): Promise<Category | null>

}