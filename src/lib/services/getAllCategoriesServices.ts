import { ICategories } from "@/interfaces/ICategories"

export class getAllCategoriesServices {
  constructor(
    private categoriesRepository: ICategories,
  ) { }

  async execute() {
    const categories = this.categoriesRepository.getAllCategories()

    return categories
  }
}