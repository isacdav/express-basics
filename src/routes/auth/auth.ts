import express from 'express';
import { authController } from '../../controllers';

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

export default router;
