import { IWorks } from "@/interfaces/IWorks"

export class getAllWorksServices {
  constructor(
    private worksRepository: IWorks
  ) { }

  async execute() {
    const work = this.worksRepository.getAllWorks()

    return work
  }
}