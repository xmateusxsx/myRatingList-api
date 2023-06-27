import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "../services/errors/invalidCredentialsError";
import { makeAuthenticateUserServices } from "../factories/makeAuthenticateUserServices";

export async function authenticateUserController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authenticateUserServices = makeAuthenticateUserServices()

    const { user } = await authenticateUserServices.execute({
      email,
      password
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id,
      }
    })

    return reply.status(200).send({
      success: true,
      message: "User authenticated",
      token: token
    })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}