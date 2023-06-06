import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateWorkServices } from "../factories/makeCreateWorkServices";
import { WorkAlreadyExistsError } from "../services/errors/workAlreadyExistsError";

export async function createWorkController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    name: z.string(),
    release: z.number().int(),
    banner: z.string().optional().default("default-work"),
    about: z.string().optional().default(""),
    author_id: z.string(),
    category_id: z.string(),
    created_by: z.string().default(userId)
  })

  const { name, release, banner, about, author_id, category_id, created_by } = bodySchema.parse(request.body)

  try {
    const createWorkServices = makeCreateWorkServices()

    await createWorkServices.execute({
      name,
      release,
      banner,
      about,
      author_id,
      category_id,
      created_by
    })

    return reply.status(201).send({
      success: true,
      message: "Work created"
    })

  } catch (err) {

    if (err instanceof WorkAlreadyExistsError) {
      return reply.status(409).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }

}