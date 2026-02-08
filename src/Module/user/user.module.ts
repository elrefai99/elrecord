import { Router } from "express"
import { profileController } from "./user.controller"
import { profileMiddleware } from "./middleware/profile.middleware"

const router: Router = Router()

router.get("/profile", profileMiddleware, profileController)

export default router
