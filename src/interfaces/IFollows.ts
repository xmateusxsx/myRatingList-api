import { Prisma, Follow } from "@prisma/client";

export interface IFollow {
  follow(data: Prisma.FollowUncheckedCreateInput): Promise<Follow>

  unfollow(followed_id: string, following_id: string): Promise<any>

  verifyFollow(followed_id: string, following_id: string): Promise<Follow | null>

  myFollowers(followed_id: string): Promise<object | null>

  whoIFollow(following_id: string): Promise<object | null>
}