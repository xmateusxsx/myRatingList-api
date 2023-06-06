import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeFindAllRatingsOnWorkServices } from "../factories/makeFindAllRatingsOnWorkServices";


export async function findAllRatingsOnWorkController(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    work_id: z.string(),
  })

  const { work_id } = bodySchema.parse(request.params)

  const findAllRatingsOnWork = makeFindAllRatingsOnWorkServices()

  const ratings = await findAllRatingsOnWork.execute({
    work_id
  })

  return reply.status(200).send({
    success: true,
    ratings
  })
}