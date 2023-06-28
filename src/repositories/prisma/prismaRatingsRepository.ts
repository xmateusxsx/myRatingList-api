import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { IRatings } from "@/interfaces/IRatings";

export class PrismaRatingsRepository implements IRatings {
  async create(data: Prisma.RatingUncheckedCreateInput) {
    const rating = await prisma.rating.create({
      data
    })

    return rating
  }

  async getRatingsOfUser(user_id: string) {
    const ratings = await prisma.rating.findMany({
      select: {
        id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true,
        work: {
          select: {
            id: true,
            name: true,
            banner: true
          }
        }
      },
      where: {
        user: {
          id: user_id
        }
      }
    })

    const numberOfRatings = ratings.length

    return {
      numberOfRatings,
      ratings
    }
  }

  async getRecentRatings() {
    const recentRatings = prisma.rating.findMany({
      orderBy: {
        created_at: "desc"
      },
      take: 5,
      select: {
        id: true,
        rating: true,
        user: {
          select: {
            name: true
          }
        },
        work: {
          select: {
            name: true
          }
        }
      }
    })

    return recentRatings
  }

  async editRating(rating_id: string, rating_value: number, comment: string | undefined, user_id: string) {
    const rating = await prisma.rating.update({
      where: {
        id_user_id: {
          id: rating_id,
          user_id
        }
      },
      data: {
        rating: rating_value,
        comment,
      }
    })

    return rating
  }

  async deleteRating(rating_id: string, user_id: string) {
    const rating = await prisma.rating.delete({
      where: {
        id_user_id: {
          id: rating_id,
          user_id
        }
      }
    })

    return rating
  }

  async verifyRatingBeforeAction(rating_id: string, user_id: string) {
    const rating = await prisma.rating.findFirst({
      where: {
        id: rating_id,
        user_id
      }
    })

    return rating
  }

  async verifyRating(work_id: string, user_id: string) {
    const doesUserHaveARatingOnTheWork = await prisma.rating.findFirst({
      where: {
        user_id,
        work_id
      }
    })

    return doesUserHaveARatingOnTheWork
  }

  async workRatings(work_id: string) {
    const workRatings = await prisma.rating.findMany({
      orderBy: {
        created_at: "desc"
      },
      where: {
        work_id
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return workRatings
  }

}