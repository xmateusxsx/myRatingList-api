import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetTopRatedWorksOfMonthServices } from "../factories/makeGetTopRatedWorksOfMonthServices";

export async function getTopRatedWorksOfMonthController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getTopRatedWorksOfMonth = makeGetTopRatedWorksOfMonthServices()

    const works = await getTopRatedWorksOfMonth.execute()

    return reply.status(200).send({
      success: true,
      works
    })

  } catch (err) {

    throw err
  }
}