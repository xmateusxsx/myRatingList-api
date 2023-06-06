import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { AlreadyHaveAnRatingForThisWorkError } from "../services/errors/alreadyHaveAnRatingForThisWorkError";
import { makeCreateRatingServices } from "../factories/makeCreateRatingServices";
import { InvalidRatingValue } from "../services/errors/invalidRatingValueError";


export async function createRatingController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    rating: z.number(),
    comment: z.string(),
    work_id: z.string(),
    user_id: z.string().default(userId)
  })

  const { rating, comment, work_id, user_id } = bodySchema.parse(request.body)

  try {
    const createRatingServices = makeCreateRatingServices()

    await createRatingServices.execute(
      { rating, comment },
      { workId: work_id },
      { userId: user_id }
    )

    return reply.status(201).send({
      success: true,
      message: "Your rating has been created"
    })

  } catch (err) {
    if (err instanceof InvalidRatingValue) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    if (err instanceof AlreadyHaveAnRatingForThisWorkError) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}