import { Router } from 'express';
import { userMiddleware } from '../../middleware/authintication/user.middleware';
import { chatController, dmChatController } from './chat.controller';

const router: Router = Router();

router.get("/chat", userMiddleware, chatController)
router.get("/dm/:id", userMiddleware, dmChatController)

export default router;
