import { Router } from 'express';
import { profileMiddleware } from '../../middleware/authintication/profile.middleware';
import { profileController } from './user.controller';

const router: Router = Router();

router.get('/profile', profileMiddleware, profileController)

export default router;
