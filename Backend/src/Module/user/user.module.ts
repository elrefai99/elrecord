import { Router } from "express"
import { profileController } from "./user.controller"
import { profileGuard } from "../../Common/Guards/profile.guard"

const router: Router = Router()

router.get("/profile", profileGuard, profileController)

export default router
