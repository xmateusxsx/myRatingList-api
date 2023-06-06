import { IRatings } from "@/interfaces/IRatings"
import { NotOwnerOfTheRatingError } from "./errors/notOwnerOfTheRatingError"

interface editRatingServicesParams {
  rating_id: string,
  rating_value: number,
  comment: string | undefined,
  user_id: string
}

export class EditRatingServices {
  constructor(
    private ratingsRepository: IRatings,
  ) { }

  async execute({ rating_id, rating_value, comment, user_id }: editRatingServicesParams) {
    const ownerOfThisRating = await this.ratingsRepository.verifyRatingBeforeAction(rating_id, user_id)

    if (!ownerOfThisRating) {
      throw new NotOwnerOfTheRatingError()
    }

    const editThisRating = await this.ratingsRepository.editRating(rating_id, rating_value, comment, user_id)

    return editThisRating
  }
}