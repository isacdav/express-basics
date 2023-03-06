import express from 'express';

import { products } from './admin';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', { products, docTitle: 'Shop', path: '/' });
});

export default router;
