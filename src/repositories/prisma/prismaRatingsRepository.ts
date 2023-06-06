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
      where: {
        work_id
      },
      select: {
        rating: true,
        comment: true,
        work_id: true,
        user_id: true
      }
    })

    return workRatings
  }

}