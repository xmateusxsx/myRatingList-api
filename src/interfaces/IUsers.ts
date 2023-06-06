import { Prisma, User } from "@prisma/client";

export interface IUsers {
  create(data: Prisma.UserCreateInput): Promise<User>

  editUser(user_id: string, avatar: string, email: string, password: string): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  findByName(name: string): Promise<User | null>

  findById(id: string): Promise<User | null>
}