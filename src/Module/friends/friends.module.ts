import { Router } from "express";
import { userMiddleware } from "../../middleware/auth/user.middleware";
import {
     requestFriendController,
     listOfFriendsController,
     acceptRequestController,
     rejectRequestController
} from "./friends.controller";

const router: Router = Router()

router.post("/send", userMiddleware, requestFriendController)
router.get("/list", userMiddleware, listOfFriendsController)
router.post("/accept/:requestId", userMiddleware, acceptRequestController)
router.post("/reject/:requestId", userMiddleware, rejectRequestController)


export default router
