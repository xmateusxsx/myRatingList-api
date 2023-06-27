import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetWhoIFollowServices } from "../factories/makeGetWhoIFollowServices"

export async function getWhoIFollowController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    following_id: z.string(),
  })

  const { following_id } = bodySchema.parse(request.params)

  try {
    const getWhoIFollowServices = makeGetWhoIFollowServices()

    const following = await getWhoIFollowServices.execute({
      following_id
    })

    return reply.status(200).send({
      success: true,
      ...following
    })

  } catch (err) {

    throw err
  }
}