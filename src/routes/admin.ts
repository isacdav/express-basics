import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/product', productController.getAddProduct);
router.post('/product', productController.postAddProduct);

export default router;
