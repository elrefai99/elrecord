import { Router } from 'express';
import { loginController, logoutController, refreshController, registerController } from './auth.controller';
import { validationMiddleware } from '../../middleware/validation/validation.middleware';
import { registerDto } from './DTO/register.dto';
import { loginDto } from './DTO/login.dto';

const router: Router = Router();

router.post('/register', validationMiddleware(registerDto), registerController)
router.post('/login', validationMiddleware(loginDto), loginController)
router.get('/refresh', refreshController)
router.get('/logout', logoutController)

export default router;
