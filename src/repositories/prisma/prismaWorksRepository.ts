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
      },
      select: {
        id: true,
        banner: true,
        name: true,
        release: true,
        about: true,
        author: {
          select: {
            id: true,
            name: true
          }
        }
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

  async getAllWorks() {
    const work = await prisma.work.findMany({
      orderBy: {
        created_at: "desc"
      },
      select: {
        id: true,
        name: true,
        release: true,
        banner: true,
        author: {
          select: {
            id: true,
            name: true,
            banner: true
          }
        }
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
        }
      }
    })

    return recentWorks
  }

  async getTopRatedWorksOfMonth() {
    let date = new Date();
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth() + 1;

    const workRatingsInFilter = await prisma.work.findMany({
      select: {
        id: true,
        name: true,
        banner: true,
        Rating: {
          select: {
            rating: true,
            created_at: true,
          },
          where: {
            created_at: {
              lte: new Date(`${thisYear}-${thisMonth}-31`).toISOString(),
              gte: new Date(`${thisYear}-${thisMonth}-01`).toISOString()
            }
          }
        }
      }
    })

    var worksWithAverage = workRatingsInFilter.map(work => {
      const allRatings = work.Rating.map(rating => rating.rating)
      const numberOfRatings = allRatings.length

      if (numberOfRatings === 0) {
        return {
          ...work,
          average: 0
        }
      }

      const totalRatingOfWork = allRatings.reduce((accumulator, value) => {
        return accumulator + value
      })

      const average = totalRatingOfWork / numberOfRatings

      const format = average.toFixed(0)

      const formattedAverage = parseInt(format, 0)

      return {
        ...work,
        average: formattedAverage
      }
    });

    function orderByAverage() {
      const works = worksWithAverage.sort(function (a, b) {
        let AAverage = a.average;
        let BAverage = b.average;

        return BAverage - AAverage
      })
      const take5 = works.slice(0, 5)

      return take5
    }

    return orderByAverage()

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

      const numberOfRatings = allRatings.length

      const getRatingValues = allRatings.map(rating => rating.rating)

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