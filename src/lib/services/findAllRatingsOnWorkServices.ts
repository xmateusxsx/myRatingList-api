import { IRatings } from "@/interfaces/IRatings"

interface findAllRatingsOnWorkServicesParams {
  work_id: string,
}

export class FindAllRatingsOnWorkServices {
  constructor(
    private ratingsRepository: IRatings,
  ) { }

  async execute({ work_id }: findAllRatingsOnWorkServicesParams) {

    const allRatings = await this.ratingsRepository.workRatings(work_id)

    return allRatings
  }
}