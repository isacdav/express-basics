import { RequestHandler } from 'express';
import { RequestAuth } from '../interfaces/interfaces';
import Product from '../models/product';

export const getIndex: RequestHandler = async (req, res) => {
  let products;

  try {
    products = await Product.getAll();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/product-list', { products, docTitle: 'Shop', path: '/' });
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  const productId = req.params.productId;
  let product;

  try {
    product = await Product.getById(productId);
  } catch (error) {
    console.error(error);
  } finally {
    res.render('shop/product-detail', { product, docTitle: 'Productaaaa', path: '/' });
  }
};

export const getCart: RequestHandler = async (req: RequestAuth, res) => {
  let cartProducts;

  try {
    cartProducts = await req.user?.getCart();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', cartProducts });
  }
};

export const postCart: RequestHandler = async (req: RequestAuth, res) => {
  const productId = req.body.productId;

  try {
    const product = (await Product.getById(productId)) as Product;
    req.user?.addToCart(product);
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/cart');
  }
};

export const postDeleteCartItem: RequestHandler = async (req: RequestAuth, res) => {
  const productId = req.body.productId;

  try {
    await req.user?.deleteFromCart(productId);
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/cart');
  }
};

export const getCheckout: RequestHandler = (req, res) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
};

export const getOrders: RequestHandler = async (req: RequestAuth, res) => {
  let orders;

  try {
    orders = await req.user?.getOrders();
  } catch (error) {
    console.log(error);
  } finally {
    res.render('shop/orders', { docTitle: 'Your orders', path: '/orders', orders });
  }
};

export const postOrder: RequestHandler = async (req: RequestAuth, res) => {
  try {
    req.user?.createOrder();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/orders');
  }
};
