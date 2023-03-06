import express from 'express';

const router = express.Router();

const products: Product[] = [];

router.get('/product', (req, res, next) => {
  res.render('product', { docTitle: 'Add product', path: '/admin/product' });
});

router.post('/product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

export { router, products };
