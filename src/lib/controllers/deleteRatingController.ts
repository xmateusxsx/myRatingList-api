import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { NotOwnerOfTheRatingError } from "../services/errors/notOwnerOfTheRatingError";
import { makeDeleteRatingServices } from "../factories/makeDeleteRatingServices";


export async function deleteRatingController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    rating_id: z.string(),
    user_id: z.string().default(userId)
  })

  const { rating_id, user_id } = bodySchema.parse(request.body)

  try {
    const deleteRatingServices = makeDeleteRatingServices()

    await deleteRatingServices.execute({
      rating_id,
      user_id
    })

    return reply.status(200).send({
      success: true,
      message: "Your rating has been deleted"
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