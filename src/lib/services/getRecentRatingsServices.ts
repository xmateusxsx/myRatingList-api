import { IRatings } from "@/interfaces/IRatings"


export class GetRecentRatingsServices {
  constructor(
    private ratingsRepository: IRatings,
  ) { }

  async execute() {
    const recentRatings = this.ratingsRepository.getRecentRatings()

    return recentRatings
  }
}