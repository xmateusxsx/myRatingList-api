import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../services/errors/userAlreadyExistsError";
import { makeCreateUserServices } from "../factories/makeCreateUserServices";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string().optional().default("default-user"),
    password: z.string().min(6)
  })

  const { name, email, avatar, password } = bodySchema.parse(request.body)

  try {
    const createUserServices = makeCreateUserServices()

    await createUserServices.execute({
      name,
      email,
      avatar,
      password
    })

    return reply.status(201).send({
      success: true,
      message: "User created"
    })

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}