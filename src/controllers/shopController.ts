import { RequestHandler } from 'express';
import Product from '../models/product';

export const getIndex: RequestHandler = async (req, res) => {
  const products = await Product.getAll();

  res.render('shop/index', { products, docTitle: 'Shop', path: '/' });
};

export const getProducts: RequestHandler = async (req, res) => {
  const products = await Product.getAll();

  res.render('shop/product-list', { products, docTitle: 'All products', path: '/products' });
};

export const getProduct: RequestHandler = async (req, res) => {
  const productId = Number(req.params.productId);
  const product = await Product.getById(productId);
  res.render('shop/product-detail', { product, docTitle: product?.title, path: '/products' });
};

export const getCart: RequestHandler = (req, res) => {
  res.render('shop/cart', { docTitle: 'Your cart', path: '/cart' });
};

export const postCart: RequestHandler = (req, res) => {
  const productId = Number(req.body.productId);
console.log('productId', productId);
  res.redirect('/cart');
};

export const getCheckout: RequestHandler = (req, res) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
};

export const getOrders: RequestHandler = (req, res) => {
  res.render('shop/orders', { docTitle: 'Your orders', path: '/orders' });
};
