import { Prisma, Work } from "@prisma/client";

export interface IWorks {
  create(data: Prisma.WorkUncheckedCreateInput): Promise<Work>

  findById(id: string): Promise<object | null>

  findByName(name: string): Promise<Work | null>

  getRecentWorks(): Promise<any[] | null>

  getTopRatedWorksOfMonth(): Promise<any | null>

  getAverage(work_id: string): Promise<number>
}