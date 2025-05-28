import { Router } from 'express';
import { profileMiddleware } from '../../middleware/authintication/profile.middleware';
import { profileController } from './user.controller';
import { editController } from './controller/edit.controller';
import { userMiddleware } from '../../middleware/authintication/user.middleware';

const router: Router = Router();

router.get('/profile', profileMiddleware, profileController)
router.put('/:id', userMiddleware, editController)

export default router;
