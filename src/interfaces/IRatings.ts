import { Prisma, Rating } from "@prisma/client";

export interface IRatings {
  create(data: Prisma.RatingUncheckedCreateInput): Promise<Rating>

  getRecentRatings(): Promise<object | null>

  editRating(rating_id: string, rating_value: number, comment: string | undefined, user_id: string): Promise<Rating>

  deleteRating(rating_id: string, user_id: string): Promise<Rating>

  verifyRatingBeforeAction(rating_id: string, user_id: string): Promise<Rating | null>

  verifyRating(work_id: string, user_id: string): Promise<Rating | null>

  workRatings(work_id: string): Promise<{ rating: number, comment: string | null }[] | null>
}