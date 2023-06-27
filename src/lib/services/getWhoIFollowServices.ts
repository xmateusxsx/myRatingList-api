import { IFollow } from "@/interfaces/IFollows"

interface getWhoIFollowServicesParams {
  following_id: string,
}

export class GetWhoIFollowServices {
  constructor(
    private followsRepository: IFollow,
  ) { }

  async execute({ following_id }: getWhoIFollowServicesParams) {
    const following = this.followsRepository.whoIFollow(following_id)

    return following
  }
}