import { IRatings } from "@/interfaces/IRatings"

interface getRatingsOfUserParams {
  user_id: string,
}

export class GetRatingsOfUserServices {
  constructor(
    private ratingsRepository: IRatings,
  ) { }

  async execute({ user_id }: getRatingsOfUserParams) {
    const ratings = await this.ratingsRepository.getRatingsOfUser(user_id)

    return {
      ratings
    }
  }
}