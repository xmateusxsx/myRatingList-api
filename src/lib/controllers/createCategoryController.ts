import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateCategoryServices } from "../factories/makeCreateCategoryServices";
import { CategoryAlreadyExistsError } from "../services/errors/categoryAlreadyExistsError";

export async function createCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    name: z.string(),
    created_by: z.string().default(userId)
  })

  const { name, created_by } = bodySchema.parse(request.body)

  try {
    const createCategoryServices = makeCreateCategoryServices()

    await createCategoryServices.execute({
      name,
      created_by
    })

    return reply.status(201).send({
      success: true,
      message: "Category created"
    })

  } catch (err) {

    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }

}