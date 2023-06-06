import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"
import { IUsers } from "@/interfaces/IUsers";

export class PrismaUserRepository implements IUsers {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async editUser(user_id: string, avatar: string, email: string, password: string) {
    const user = await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        avatar,
        email,
        password
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findByName(name: string) {
    const user = await prisma.user.findUnique({
      where: {
        name
      }
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
}