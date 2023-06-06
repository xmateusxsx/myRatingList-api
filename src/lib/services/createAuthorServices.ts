import { IAuthors } from "@/interfaces/IAuthors"
import { AuthorAlreadyExistsError } from "./errors/authorAlreadyExistsError"

interface createAuthorServicesParams {
  name: string,
  banner: string,
  created_by: string,
}

export class CreateAuthorServices {
  constructor(
    private authorsRepository: IAuthors,
  ) { }

  async execute({ name, banner, created_by }: createAuthorServicesParams) {

    const doesAuthorExists = await this.authorsRepository.findByName(name)

    if (doesAuthorExists) {
      throw new AuthorAlreadyExistsError()
    }

    await this.authorsRepository.create({
      name,
      banner,
      created_by
    })

  }
}