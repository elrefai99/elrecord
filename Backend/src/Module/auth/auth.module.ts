import { Router } from "express";
import { forgetPasswordController, loginController, logoutController, refreshController, registerController, resetPasswordController } from "./auth.controller";

const router: Router = Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.post("/refresh", refreshController)
router.post("/forget-password", forgetPasswordController)
router.post("/reset-password", resetPasswordController)

export default router
