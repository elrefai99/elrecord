import { Router } from "express"
import { changeUsernameController, profileController } from "./user.controller"
import { profileGuard } from "../../Common/Guards/profile.guard"
import { validationPipe } from "../../Common/pipe/validationBody.pipe"
import { change_username_dto } from "./Pipe/edit.dto"
import { userGuard } from "../../Common/Guards/user.guard"

const router: Router = Router()

router.get("/profile", profileGuard, profileController)
router.patch("/change-username", userGuard, validationPipe(change_username_dto), changeUsernameController)

export default router
