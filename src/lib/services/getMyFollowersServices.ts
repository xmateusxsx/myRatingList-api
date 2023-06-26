import { IFollow } from "@/interfaces/IFollows"

interface getMyFollowersServicesParams {
  followed_id: string,
}

export class getMyFollowersServices {
  constructor(
    private followsRepository: IFollow,
  ) { }

  async execute({ followed_id }: getMyFollowersServicesParams) {
    const followers = this.followsRepository.myFollowers(followed_id)

    return followers
  }
}