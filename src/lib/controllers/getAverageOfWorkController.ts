import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeGetAverageOfWorkServices } from "../factories/makeGetAverageOfWorkServices";

export async function getAverageOfWorkController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    work_id: z.string(),
  })

  const { work_id } = bodySchema.parse(request.params)

  try {
    const getAverageOfWorkServices = makeGetAverageOfWorkServices()

    const average = await getAverageOfWorkServices.execute({
      work_id
    })

    return reply.status(200).send({
      success: true,
      average
    })

  } catch (err) {

    throw err
  }
}