import { FastifyRequest, FastifyReply } from "fastify"

export async function refreshController(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({}, {
    sign: {
      sub: request.user.sub
    }
  })

  const refreshToken = await reply.jwtSign({}, {
    sign: {
      sub: request.user.sub,
      expiresIn: "7d"
    }
  })

  return reply.setCookie("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true
  }).status(200).send({
    success: true,
    message: "User authenticated",
    token: token
  })

}