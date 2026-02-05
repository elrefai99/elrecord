import { Router } from "express";
import { pendingTokenMiddleware } from "./middleware/pending.middleware";
import { checkOTPController, sendOTPController } from "./otp.controller";

const router: Router = Router()

router.post("/send", pendingTokenMiddleware, sendOTPController)
router.post("/check", pendingTokenMiddleware, checkOTPController)

export default router
