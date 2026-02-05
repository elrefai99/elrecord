import { Router } from "express";
import { pendingTokenMiddleware } from "./middleware/pending.middleware";
import { sendOTPController } from "./otp.controller";

const router: Router = Router()

router.post("/send", pendingTokenMiddleware, sendOTPController)

export default router
