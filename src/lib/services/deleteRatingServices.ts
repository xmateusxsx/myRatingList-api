import { IRatings } from "@/interfaces/IRatings"
import { NotOwnerOfTheRatingError } from "./errors/notOwnerOfTheRatingError"

interface deleteRatingServicesParams {
  rating_id: string,
  user_id: string
}

export class DeleteRatingServices {
  constructor(
    private ratingsRepository: IRatings,
  ) { }

  async execute({ rating_id, user_id }: deleteRatingServicesParams) {
    const ownerOfThisRating = await this.ratingsRepository.verifyRatingBeforeAction(rating_id, user_id)

    if (!ownerOfThisRating) {
      throw new NotOwnerOfTheRatingError()
    }

    const deleteThisRating = await this.ratingsRepository.deleteRating(rating_id, user_id)

    return deleteThisRating
  }
}