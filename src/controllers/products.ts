import { RequestHandler } from 'express';

const products: Product[] = [];

const getAddProduct: RequestHandler = (req, res) => {
  res.render('product', { docTitle: 'Add product', path: '/admin/product' });
};

const getProducts: RequestHandler = (req, res) => {
  res.render('shop', { products, docTitle: 'Shop', path: '/' });
};

const postAddProduct: RequestHandler = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

export default {
  getAddProduct,
  getProducts,
  postAddProduct,
};
