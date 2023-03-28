import { Router } from 'express';
import { authController } from '../../controllers';
import { loginValitadationRules, signupValidationRules } from '../../middlewares';

const router = Router();

router.get('/login', authController.getLogin);
router.post('/login', loginValitadationRules(), authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', signupValidationRules(), authController.postSignup);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

export default router;
