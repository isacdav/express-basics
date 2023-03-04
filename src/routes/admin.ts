import path from 'path';
import express from 'express';

import { rootDir } from '../util/path';

const router = express.Router();

router.get('/product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'product.html'));
});

router.post('/product', (req, res, next) => {
  console.log('base route');
  res.send('<h2> post prod </h2>');
});

export default router;
