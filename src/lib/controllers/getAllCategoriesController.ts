import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetAllCategoriesServices } from "../factories/makeGetAllCategoriesServices";

export async function getAllCategoriesController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllCategories = makeGetAllCategoriesServices()

    const categories = await getAllCategories.execute()

    return reply.status(200).send({
      success: true,
      categories
    })

  } catch (err) {

    throw err
  }
}