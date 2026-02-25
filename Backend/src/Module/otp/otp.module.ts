import { Router } from "express";
import { pendingTokenGuard } from "./Guards/pending.guard";
import { checkOTPController, sendOTPController } from "./otp.controller";
import { profileMiddleware } from "../user/middleware/profile.middleware";

const router: Router = Router()

router.post("/send", pendingTokenGuard, sendOTPController)
router.post("/new-send", profileMiddleware, sendOTPController)
router.post("/check", pendingTokenGuard, checkOTPController)

export default router
