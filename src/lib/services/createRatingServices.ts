import { IRatings } from "@/interfaces/IRatings"
import { IUsers } from "@/interfaces/IUsers"
import { IWorks } from "@/interfaces/IWorks"
import { AlreadyHaveAnRatingForThisWorkError } from "./errors/alreadyHaveAnRatingForThisWorkError"
import { InvalidRatingValue } from "./errors/invalidRatingValueError"

interface ratingWorkServicesParams {
  rating: number,
  comment: string,
}

interface workParams {
  workId: string
}

interface userParams {
  userId: string
}

export class CreateRatingServices {
  constructor(
    private ratingsRepository: IRatings,
    private worksRepository: IWorks,
    private usersRepository: IUsers
  ) { }

  async execute(
    { rating, comment }: ratingWorkServicesParams,
    { workId }: workParams,
    { userId }: userParams) {

    const workToReceiveRating = await this.worksRepository.findById(workId)
    const ratingByUser = await this.usersRepository.findById(userId)

    const work_id = await workToReceiveRating!.id
    const user_id = await ratingByUser!.id

    const verifyRating = await this.ratingsRepository.verifyRating(work_id, user_id)

    if (rating < 0 || rating > 100) {
      throw new InvalidRatingValue()
    }

    if (verifyRating !== null) {
      throw new AlreadyHaveAnRatingForThisWorkError()
    }

    const createdRating = await this.ratingsRepository.create({
      rating,
      comment,
      work_id,
      user_id
    })

    return createdRating
  }
}