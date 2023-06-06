import { IWorks } from "@/interfaces/IWorks"

interface getAverageOfWorkServicesParams {
  work_id: string,
}

export class GetAverageOfWorkServices {
  constructor(
    private worksRepository: IWorks,
  ) { }

  async execute({ work_id }: getAverageOfWorkServicesParams) {
    const average = this.worksRepository.getAverage(work_id)

    return average
  }
}