import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { UserDoesNotExistsError } from "../services/errors/userDoesNotExistsError";
import { makeFindUserByIdServices } from "../factories/makeFindUserByIdServices";

export async function findUserByIdController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    user_id: z.string(),
  })

  const { user_id } = bodySchema.parse(request.params)

  try {
    const findUserByIdServices = makeFindUserByIdServices()

    const user = await findUserByIdServices.execute({
      user_id
    })

    return reply.status(200).send({
      success: true,
      user
    })

  } catch (err) {
    if (err instanceof UserDoesNotExistsError) {
      return reply.status(404).send({
        success: false,
        message: err.message
      })
    }

    return reply.status(500).send()
  }
}