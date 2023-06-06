import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateAuthorServices } from "../factories/makeCreateAuthorServices";
import { AuthorAlreadyExistsError } from "../services/errors/authorAlreadyExistsError";

export async function createAuthorController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    name: z.string(),
    banner: z.string().optional().default("default-author"),
    created_by: z.string().default(userId)
  })

  const { name, banner, created_by } = bodySchema.parse(request.body)

  try {
    const createAuthorServices = makeCreateAuthorServices()

    await createAuthorServices.execute({
      name,
      banner,
      created_by
    })

    return reply.status(201).send({
      success: true,
      message: "Author created"
    })

  } catch (err) {

    if (err instanceof AuthorAlreadyExistsError) {
      return reply.status(409).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }

}