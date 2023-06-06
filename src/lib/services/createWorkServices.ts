import { IWorks } from "@/interfaces/IWorks"
import { WorkAlreadyExistsError } from "./errors/workAlreadyExistsError"

interface createWorkServicesParams {
  name: string,
  release: number,
  banner: string,
  about: string,
  author_id: string,
  category_id: string,
  created_by: string,
}

export class CreateWorkServices {
  constructor(
    private worksRepository: IWorks,
  ) { }

  async execute({ name, release, banner, about, author_id, category_id, created_by }: createWorkServicesParams) {

    const doesWorkAlreadyExists = await this.worksRepository.findByName(name)

    if (doesWorkAlreadyExists) {
      throw new WorkAlreadyExistsError()
    }

    await this.worksRepository.create({
      name,
      release,
      banner,
      about,
      author_id,
      category_id,
      created_by
    })
  }
}