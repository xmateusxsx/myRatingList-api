import { IWorks } from "@/interfaces/IWorks"

export class GetRecentWorksServices {
  constructor(
    private worksRepository: IWorks,
  ) { }

  async execute() {
    const recentWorks = this.worksRepository.getRecentWorks()

    return recentWorks
  }
}