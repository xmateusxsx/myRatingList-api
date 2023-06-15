import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { IWorks } from "@/interfaces/IWorks";

export class PrismaWorksRepository implements IWorks {
  async create(data: Prisma.WorkUncheckedCreateInput) {
    const work = await prisma.work.create({
      data,
    })

    return work
  }

  async findById(id: string) {
    const work = await prisma.work.findUnique({
      where: {
        id
      }
    })

    return work
  }

  async findByName(name: string) {
    const work = await prisma.work.findUnique({
      where: {
        name
      }
    })

    return work
  }

  async getRecentWorks() {
    const recentWorks = await prisma.work.findMany({
      orderBy: {
        created_at: "desc"
      },
      take: 5,
      select: {
        id: true,
        name: true,
        release: true,
        category: {
          select: {
            name: true
          }
        },
        author: {
          select: {
            name: true
          }
        },
        Rating: {
          select: {
            rating: true
          }
        },

      }
    })

    return recentWorks
  }

  async getAverage(work_id: string) {
    const allRatings = await prisma.rating.findMany({
      where: {
        work_id
      }
    })

    if (allRatings.length === 0) {

      return 0

    } else {

      const numberOfRatings = await allRatings.length

      const getRatingValues = await allRatings.map(rating => rating.rating)

      const totalRatingOfWork = getRatingValues.reduce((accumulator, value) => {
        return accumulator + value
      })

      const average = totalRatingOfWork / numberOfRatings

      const format = average.toFixed(0)

      const formattedAverage = parseInt(format, 0)

      return formattedAverage
    }
  }
}