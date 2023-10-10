import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetAllWorksServices } from "../factories/makeGetAllWorksServicecs"

export async function getAllWorksController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllWorks = makeGetAllWorksServices()

    const work = await getAllWorks.execute()

    return reply.status(200).send({
      success: true,
      work
    })

  } catch (err) {

    throw err
  }
}