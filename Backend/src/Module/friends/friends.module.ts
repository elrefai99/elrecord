import { Router } from "express";
import {
     requestFriendController,
     listOfFriendsController,
     acceptRequestController,
     rejectRequestController
} from "./friends.controller";
import { userGuard } from "../../Common/Guards/user.guard";

const router: Router = Router()

router.post("/send", userGuard, requestFriendController)
router.get("/list", userGuard, listOfFriendsController)
router.post("/accept/:requestId", userGuard, acceptRequestController)
router.post("/reject/:requestId", userGuard, rejectRequestController)


export default router
