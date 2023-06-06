import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeFollowUserServices } from "../factories/makeFollowUserServices"
import { AlreadyFollowError } from "../services/errors/alreadyFollowError"
import { CantFollowYourselfError } from "../services/errors/cantFollowYourselfError"

export async function followUserController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    followed_id: z.string(),
    following_id: z.string().default(userId)
  })

  const { followed_id, following_id } = bodySchema.parse(request.body)

  try {
    const followUserServices = makeFollowUserServices()

    await followUserServices.execute({
      followed_id,
      following_id
    })

    return reply.status(201).send({
      success: true,
      message: "Followed with success"
    })

  } catch (err) {
    if (err instanceof AlreadyFollowError) {
      return reply.status(409).send({
        success: false,
        message: err.message
      })
    }

    if (err instanceof CantFollowYourselfError) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}