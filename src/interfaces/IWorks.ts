import { Prisma, Work } from "@prisma/client";

export interface IWorks {
  create(data: Prisma.WorkUncheckedCreateInput): Promise<Work>

  findById(id: string): Promise<Work | null>

  findByName(name: string): Promise<Work | null>

  getAverage(work_id: string): Promise<number>
}