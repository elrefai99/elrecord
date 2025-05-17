import { Router } from 'express';
import { registerController } from './auth.controller';

const router: Router = Router();

router.post('/register', registerController)

export default router;
