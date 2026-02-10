import { Router } from "express";
import { userMiddleware } from "../../middleware/auth/user.middleware";
import {
     requestFriendController,
     listRequestsController,
     listFriendsController,
     acceptRequestController,
     rejectRequestController
} from "./friends.controller";

const router: Router = Router()

router.post("/send", userMiddleware, requestFriendController)
router.get("/requests", userMiddleware, listRequestsController)
router.get("/list", userMiddleware, listFriendsController)
router.post("/accept/:requestId", userMiddleware, acceptRequestController)
router.post("/reject/:requestId", userMiddleware, rejectRequestController)


export default router
