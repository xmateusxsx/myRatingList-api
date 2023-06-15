import { IWorks } from "@/interfaces/IWorks"

interface GetWorkInfoServicesParams {
  work_id: string
}

export class GetWorkInfoServices {
  constructor(
    private worksRepository: IWorks,
  ) { }

  async execute({ work_id }: GetWorkInfoServicesParams) {
    const work = this.worksRepository.findById(work_id)

    return work
  }
}