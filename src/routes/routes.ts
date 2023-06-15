import { FastifyInstance } from "fastify";
import { createUserController } from "@/lib/controllers/createUserController";
import { findUserByNameController } from "@/lib/controllers/findUserByNameController";
import { createRatingController } from "@/lib/controllers/createRatingController";
import { findAllRatingsOnWorkController } from "@/lib/controllers/findAllRatingsOnWorkController";
import { authenticateUserController } from "@/lib/controllers/authenticateUserController";
import { verifyJWT } from "@/lib/middlewares/verifyJwt";
import { getUserProfileController } from "@/lib/controllers/getUserProfileController";
import { followUserController } from "@/lib/controllers/followUserController";
import { unfollowUserController } from "@/lib/controllers/unfollowUserController";
import { createWorkController } from "@/lib/controllers/createWorkController";
import { createAuthorController } from "@/lib/controllers/createAuthorController";
import { getAverageOfWorkController } from "@/lib/controllers/getAverageOfWorkController";
import { editRatingController } from "@/lib/controllers/editRatingController";
import { deleteRatingController } from "@/lib/controllers/deleteRatingController";
import { editUserController } from "@/lib/controllers/editUserController";
import { refreshController } from "@/lib/controllers/refreshController";
import { createCategoryController } from "@/lib/controllers/createCategoryController";
import { getRecentWorksController } from "@/lib/controllers/getRecentWorksController";
import { getWorkInfoController } from "@/lib/controllers/getWorkInfoController";


export async function routes(app: FastifyInstance) {
  app.post("/users", createUserController)
  app.post("/session", authenticateUserController)
  app.post("/refresh/token", refreshController)
  app.post("/rating", { onRequest: [verifyJWT] }, createRatingController)
  app.post("/follow", { onRequest: [verifyJWT] }, followUserController)
  app.post("/author", { onRequest: [verifyJWT] }, createAuthorController)
  app.post("/category", { onRequest: [verifyJWT] }, createCategoryController)
  app.post("/work", { onRequest: [verifyJWT] }, createWorkController)

  app.get("/me", { onRequest: [verifyJWT] }, getUserProfileController)
  app.get("/works/:work_id", getWorkInfoController)
  app.get("/recent/works", getRecentWorksController)
  app.get("/users/:name", findUserByNameController)
  app.get("/ratings/:work_id", findAllRatingsOnWorkController)
  app.get("/ratings/average/work/:work_id", getAverageOfWorkController)

  app.put("/users", { onRequest: [verifyJWT] }, editUserController)
  app.put("/ratings", { onRequest: [verifyJWT] }, editRatingController)

  app.delete("/follow", { onRequest: [verifyJWT] }, unfollowUserController)
  app.delete("/ratings", { onRequest: [verifyJWT] }, deleteRatingController)
}