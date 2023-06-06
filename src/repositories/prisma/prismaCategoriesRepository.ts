import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { ICategories } from "@/interfaces/ICategories";

export class PrismaCategoriesRepository implements ICategories {
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = await prisma.category.create({
      data
    })

    return category
  }

  async findByName(name: string) {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    })

    return category
  }

}