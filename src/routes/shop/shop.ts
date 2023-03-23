import { Router } from 'express';
import { shopController } from '../../controllers';
import { isAuth } from '../../middlewares';

const router = Router();

router.get('/', shopController.getIndex);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postDeleteCartItem);
router.get('/checkout', isAuth, shopController.getCheckout);
router.get('/orders', isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrder);

export default router;
