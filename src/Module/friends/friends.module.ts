import { Router } from "express";
import { userMiddleware } from "../../middleware/auth/user.middleware";
import { requestFriendController } from "./friends.controller";

const router: Router = Router()

router.post("/send", userMiddleware, requestFriendController)


export default router
