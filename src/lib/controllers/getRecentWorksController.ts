import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetRecentWorksServices } from "../factories/makeGetRecentWorksServices";

export async function getRecentWorksController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getRecentWorksServices = makeGetRecentWorksServices()

    const works = await getRecentWorksServices.execute()

    return reply.status(200).send({
      success: true,
      works
    })

  } catch (err) {

    throw err
  }
}