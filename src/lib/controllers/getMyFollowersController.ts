import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetMyFollowersServices } from "../factories/makeGetMyFollowersServices"

export async function getMyFollowersController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    followed_id: z.string(),
  })

  const { followed_id } = bodySchema.parse(request.params)

  try {
    const getMyFollowersServices = makeGetMyFollowersServices()

    const followers = await getMyFollowersServices.execute({
      followed_id
    })

    return reply.status(200).send({
      success: true,
      ...followers
    })

  } catch (err) {

    throw err
  }
}