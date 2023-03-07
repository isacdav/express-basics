import express from 'express';
import * as adminController from '../controllers/adminController';

const router = express.Router();

router.get('/products', adminController.getProducts);
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

export default router;
