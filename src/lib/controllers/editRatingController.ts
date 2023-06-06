import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeEditRatingServices } from "../factories/makeEditRatingServices";
import { NotOwnerOfTheRatingError } from "../services/errors/notOwnerOfTheRatingError";


export async function editRatingController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    rating_id: z.string(),
    rating_value: z.number(),
    comment: z.string().optional(),
    user_id: z.string().default(userId)
  })

  const { rating_id, rating_value, comment, user_id } = bodySchema.parse(request.body)

  try {
    const editRatingServices = makeEditRatingServices()

    await editRatingServices.execute({
      rating_id,
      rating_value,
      comment,
      user_id
    })

    return reply.status(200).send({
      success: true,
      message: "Your rating has been edited"
    })

  } catch (err) {
    if (err instanceof NotOwnerOfTheRatingError) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}