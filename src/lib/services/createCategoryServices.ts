import { ICategories } from "@/interfaces/ICategories"
import { CategoryAlreadyExistsError } from "./errors/categoryAlreadyExistsError"

interface createCategoryServicesParams {
  name: string,
  created_by: string
}

export class CreateCategoryServices {
  constructor(
    private categoriesRepository: ICategories,
  ) { }

  async execute({ name, created_by }: createCategoryServicesParams) {

    const doesCategoryExists = await this.categoriesRepository.findByName(name)

    if (doesCategoryExists) {
      throw new CategoryAlreadyExistsError()
    }

    await this.categoriesRepository.create({
      name,
      created_by
    })
  }
}