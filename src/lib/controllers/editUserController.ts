import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeEditUserServices } from "../factories/makeEditUserServices";
import { NotOwnerOfThisAccountError } from "../services/errors/notOwnerOfThisAccountError";


export async function editUserController(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.user.sub

  const bodySchema = z.object({
    user_id: z.string().default(userId),
    avatar: z.string(),
    email: z.string().email(),
    password: z.string()
  })

  const { user_id, avatar, email, password } = bodySchema.parse(request.body)

  try {
    const editUserServices = makeEditUserServices()

    const userToBeEdited = await editUserServices.verifyUser({
      user_id
    })

    if (userToBeEdited?.id !== userId) {
      throw new NotOwnerOfThisAccountError()
    }

    await editUserServices.execute({
      user_id,
      avatar,
      email,
      password
    })

    return reply.status(200).send({
      success: true,
      message: "Your data has been edited"
    })

  } catch (err) {
    if (err instanceof NotOwnerOfThisAccountError) {
      return reply.status(400).send({
        success: false,
        message: err.message
      })
    }

    throw err
  }
}