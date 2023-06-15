import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetWorkInfoServices } from "../factories/makeGetWorkInfoServices";

export async function getWorkInfoController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    work_id: z.string(),
  })

  const { work_id } = bodySchema.parse(request.params)

  try {
    const getWorkInfoServices = makeGetWorkInfoServices()

    const work = await getWorkInfoServices.execute({
      work_id
    })

    return reply.status(200).send({
      success: true,
      work
    })

  } catch (err) {

    throw err
  }
}