import express from 'express';
import { authController } from '../../controllers';

const router = express.Router();

router.get('/login', authController.getLogin);

export default router;
