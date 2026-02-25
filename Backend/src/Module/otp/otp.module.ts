import { Router } from "express";
import { pendingTokenGuard } from "./Guards/pending.guard";
import { checkOTPController, sendOTPController } from "./otp.controller";
import { userGuard } from "../../Common/Guards/user.guard";

const router: Router = Router()

router.post("/send", pendingTokenGuard, sendOTPController)
router.post("/new-send", userGuard, sendOTPController)
router.post("/check", pendingTokenGuard, checkOTPController)

export default router
