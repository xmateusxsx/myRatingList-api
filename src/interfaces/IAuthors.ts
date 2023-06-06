import { Prisma, Author } from "@prisma/client";

export interface IAuthors {
  create(data: Prisma.AuthorUncheckedCreateInput): Promise<Author>

  findById(author_id: string): Promise<Author | null>

  findByName(name: string): Promise<Author | null>

}