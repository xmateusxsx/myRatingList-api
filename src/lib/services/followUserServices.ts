import { IFollow } from "@/interfaces/IFollows"
import { AlreadyFollowError } from "./errors/alreadyFollowError"
import { CantFollowYourselfError } from "./errors/cantFollowYourselfError"

interface followUserServicesParams {
  followed_id: string,
  following_id: string
}

export class FollowUserServices {
  constructor(
    private followsRepository: IFollow,
  ) { }

  async execute({ followed_id, following_id }: followUserServicesParams) {

    const alreadyFollow = await this.followsRepository.verifyFollow(followed_id, following_id)

    if (alreadyFollow) {
      throw new AlreadyFollowError()
    }

    if (followed_id === following_id) {
      throw new CantFollowYourselfError()
    }

    await this.followsRepository.follow({
      followed_id,
      following_id
    })
  }
}