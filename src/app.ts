import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { routes } from "./routes/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
})

app.register(fastifyCookie)
app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      message: "Validation error",
      issues: error.format()
    })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  } else {
    //Use a external tool for logs
  }

  return reply.status(500).send({
    success: false,
    message: "Internal server error"
  })
})