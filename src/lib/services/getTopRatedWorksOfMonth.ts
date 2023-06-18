import { IWorks } from "@/interfaces/IWorks"

export class GetTopRatedWorksOfMonth {
  constructor(
    private worksRepository: IWorks,
  ) { }

  async execute() {
    const topWorksOfMonth = this.worksRepository.getTopRatedWorksOfMonth()

    return topWorksOfMonth
  }
}