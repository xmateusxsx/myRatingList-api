import { IFollow } from "@/interfaces/IFollows"
import { YouDontFollowThisUserError } from "./errors/youDontFollowThisUserError"

interface unfollowUserServicesParams {
  followed_id: string,
  following_id: string
}

export class UnfollowUserServices {
  constructor(
    private followsRepository: IFollow,
  ) { }

  async execute({ followed_id, following_id }: unfollowUserServicesParams) {

    const thisFollowExists = await this.followsRepository.verifyFollow(followed_id, following_id)

    if (!thisFollowExists) {
      throw new YouDontFollowThisUserError()
    }

    await this.followsRepository.unfollow(followed_id, following_id)
  }
}