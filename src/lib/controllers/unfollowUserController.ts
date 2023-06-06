import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeUnfollowUserServices } from "../factories/makeUnfollowUserServices"
import { YouDontFollowThisUserError } from "../services/errors/youDontFollowThisUserError"

export async function unfollowUserController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    followed_id: z.string(),
    following_id: z.string().default(userId)
  })

  const { followed_id, following_id } = bodySchema.parse(request.body)

  try {
    const unfollowUserServices = makeUnfollowUserServices()

    await unfollowUserServices.execute({
      followed_id,
      following_id
    })

    return reply.status(200).send({
      success: true,
      message: "Unfollow with success"
    })

  } catch (err) {
    if (err instanceof YouDontFollowThisUserError) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}