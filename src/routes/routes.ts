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
import { createCategoryController } from "@/lib/controllers/createCategoryController";
import { getRecentWorksController } from "@/lib/controllers/getRecentWorksController";
import { getWorkInfoController } from "@/lib/controllers/getWorkInfoController";
import { getRecentRatingsController } from "@/lib/controllers/getRecentRatingsController";
import { getTopRatedWorksOfMonthController } from "@/lib/controllers/getTopRatedWorksOfMonthController";
import { getRatingsOfUserController } from "@/lib/controllers/getRatingsOfUserController";
import { getMyFollowersController } from "@/lib/controllers/getMyFollowersController";
import { findUserByIdController } from "@/lib/controllers/findUserByIdController";
import { getWhoIFollowController } from "@/lib/controllers/getWhoIFollowController";


export async function routes(app: FastifyInstance) {
  app.post("/users", createUserController)
  app.post("/session", authenticateUserController)
  app.post("/rating", { onRequest: [verifyJWT] }, createRatingController)
  app.post("/follow", { onRequest: [verifyJWT] }, followUserController)
  app.post("/author", { onRequest: [verifyJWT] }, createAuthorController)
  app.post("/category", { onRequest: [verifyJWT] }, createCategoryController)
  app.post("/work", { onRequest: [verifyJWT] }, createWorkController)

  app.get("/me", { onRequest: [verifyJWT] }, getUserProfileController)
  app.get("/works/:work_id", getWorkInfoController)
  app.get("/recent/works", getRecentWorksController)
  app.get("/top/month/works", getTopRatedWorksOfMonthController)
  app.get("/recent/ratings", getRecentRatingsController)
  app.get("/users/:name", findUserByNameController)
  app.get("/users/id/:user_id", findUserByIdController)
  app.get("/ratings/work/:work_id", findAllRatingsOnWorkController)
  app.get("/ratings/user/:user_id", getRatingsOfUserController)
  app.get("/ratings/average/work/:work_id", getAverageOfWorkController)
  app.get("/follow/myFollowers/:followed_id", getMyFollowersController)
  app.get("/follow/whoIFollow/:following_id", getWhoIFollowController)

  app.put("/users", { onRequest: [verifyJWT] }, editUserController)
  app.put("/ratings", { onRequest: [verifyJWT] }, editRatingController)

  app.delete("/follow", { onRequest: [verifyJWT] }, unfollowUserController)
  app.delete("/ratings", { onRequest: [verifyJWT] }, deleteRatingController)
}