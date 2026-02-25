import { Router } from "express";
import { forgetPasswordController, loginController, logoutController, refreshController, registerController, resetPasswordController } from "./auth.controller";
import { validationPipe } from "../../Common/pipe/validationBody.pipe";
import { login_dto, register_dto } from "./DTO/index.dto";

const router: Router = Router()

router.post("/register", validationPipe(register_dto), registerController)
router.post("/login", validationPipe(login_dto), loginController)
router.post("/logout", logoutController)
router.post("/refresh", refreshController)
router.post("/forget-password", forgetPasswordController)
router.post("/reset-password", resetPasswordController)

export default router
