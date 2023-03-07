import { RequestHandler } from 'express';
import Product from '../models/product';

export const getProducts: RequestHandler = async (req, res) => {
  const products = await Product.getAll();

  res.render('admin/products', { products, docTitle: 'Admin products', path: '/admin/products' });
};

export const getAddProduct: RequestHandler = (req, res) => {
  res.render('admin/add-product', { docTitle: 'Add product', path: '/admin/add-product' });
};

export const postAddProduct: RequestHandler = (req, res) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect('/');
};