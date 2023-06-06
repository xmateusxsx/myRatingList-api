import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { UserDoesNotExistsError } from "../services/errors/userDoesNotExistsError";
import { makeFindUserByNameServices } from "../factories/makeFindUserByNameServices";

export async function findUserByNameController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
  })

  const { name } = bodySchema.parse(request.params)

  try {
    const findUserByname = makeFindUserByNameServices()

    const user = await findUserByname.execute({
      name
    })

    return reply.status(200).send({
      success: true,
      user: {
        ...user,
        email: undefined,
        password: undefined,
        updated_at: undefined
      }
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