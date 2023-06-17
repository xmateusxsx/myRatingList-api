import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetRecentRatingsServices } from "../factories/makeGetRecentRatingsServices";

export async function getRecentRatingsController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getRecentRatingsServices = makeGetRecentRatingsServices()

    const ratings = await getRecentRatingsServices.execute()

    return reply.status(200).send({
      success: true,
      ratings
    })

  } catch (err) {

    throw err
  }
}