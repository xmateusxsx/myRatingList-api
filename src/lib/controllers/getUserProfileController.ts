import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileServices } from "../factories/makeGetUserProfileServices";

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileServices()

  const { user } = await getUserProfile.execute({
    id: request.user.sub
  })

  return reply.status(200).send({
    success: true,
    user: {
      ...user,
      password: undefined,
      updated_at: undefined
    }
  })
}