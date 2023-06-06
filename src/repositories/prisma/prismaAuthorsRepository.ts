import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { IAuthors } from "@/interfaces/IAuthors";

export class PrismaAuthorsRepository implements IAuthors {
  async create(data: Prisma.AuthorUncheckedCreateInput) {
    const author = await prisma.author.create({
      data
    })

    return author
  }

  async findById(author_id: string) {
    const author = await prisma.author.findUnique({
      where: {
        id: author_id
      }
    })

    return author
  }

  async findByName(name: string) {
    const author = await prisma.author.findFirst({
      where: {
        name
      }
    })

    return author
  }

}