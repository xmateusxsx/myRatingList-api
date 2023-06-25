import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetRatingsOfUserServices } from "../factories/makeGetRatingsOfUserServices"

export async function getRatingsOfUserController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    user_id: z.string(),
  })

  const { user_id } = bodySchema.parse(request.params)

  try {
    const getRatingsOfUserServices = makeGetRatingsOfUserServices()

    const ratings = await getRatingsOfUserServices.execute({
      user_id
    })

    return reply.status(200).send({
      success: true,
      ...ratings
    })

  } catch (err) {

    throw err
  }
}