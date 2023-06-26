import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { IFollow } from "@/interfaces/IFollows";

export class PrismaFollowsRepository implements IFollow {
  async follow(data: Prisma.FollowUncheckedCreateInput) {
    const follow = await prisma.follow.create({
      data
    })

    return follow
  }

  async unfollow(followed_id: string, following_id: string) {
    const unfollow = await prisma.follow.deleteMany({
      where: {
        followed_id,
        following_id
      }
    })

    return unfollow
  }

  async verifyFollow(followed_id: string, following_id: string) {
    const follow = await prisma.follow.findFirst({
      where: {
        followed_id,
        following_id
      }
    })

    return follow
  }

  async myFollowers(followed_id: string) {
    const follow = await prisma.follow.findMany({
      where: {
        followed_id
      },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    const numberOfFollowers = follow.length
    const followers = follow.map(data => data.following)

    return {
      numberOfFollowers,
      followers
    }
  }

  async whoIFollow(following_id: string) {
    const follow = await prisma.follow.findMany({
      where: {
        following_id
      },

      include: {
        followers: true
      }
    })

    return follow
  }
}