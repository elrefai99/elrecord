import { Router } from 'express';
import { profileMiddleware } from '../../middleware/authintication/profile.middleware';
import { deleteController, editController, profileController } from './user.controller';
import { userMiddleware } from '../../middleware/authintication/user.middleware';

const router: Router = Router();

router.get('/profile', profileMiddleware, profileController)
router.put('/:id', userMiddleware, editController)
router.delete('/:id', userMiddleware, deleteController)

export default router;
