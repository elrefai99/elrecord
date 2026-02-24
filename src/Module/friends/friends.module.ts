import { Router } from "express";
import { userPipe } from "../../Common/pipe/user.pipe";
import {
     requestFriendController,
     listOfFriendsController,
     acceptRequestController,
     rejectRequestController
} from "./friends.controller";

const router: Router = Router()

router.post("/send", userPipe, requestFriendController)
router.get("/list", userPipe, listOfFriendsController)
router.post("/accept/:requestId", userPipe, acceptRequestController)
router.post("/reject/:requestId", userPipe, rejectRequestController)


export default router
