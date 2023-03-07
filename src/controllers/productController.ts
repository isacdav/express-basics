import { RequestHandler } from 'express';
import Product from '../models/product';

const getAddProduct: RequestHandler = (req, res) => {
  res.render('product', { docTitle: 'Add product', path: '/admin/product' });
};

const getProducts: RequestHandler = async (req, res) => {
  const products = await Product.getAll();

  res.render('shop', { products, docTitle: 'Shop', path: '/' });
};

const postAddProduct: RequestHandler = (req, res) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect('/');
};

export default {
  getAddProduct,
  getProducts,
  postAddProduct,
};
