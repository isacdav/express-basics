import { RequestHandler } from 'express';
import Cart from '../models/cart';
import Product from '../models/product';

export const getIndex: RequestHandler = async (req, res) => {
  let products: IProduct[] = [];

  try {
    const [rows] = await Product.getAll();
    products = rows;
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/index', { products, docTitle: 'Shop', path: '/' });
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  let products: IProduct[] = [];

  try {
    const [rows] = await Product.getAll();
    products = rows;
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/product-list', { products, docTitle: 'All products', path: '/products' });
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  const productId = Number(req.params.productId);
  let product: IProduct | undefined;

  try {
    const [rows] = await Product.getById(productId);
    product = rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    res.render('shop/product-detail', { product, docTitle: product?.title, path: '/products' });
  }
};

export const getCart: RequestHandler = async (req, res) => {
  const cart = await Cart.getCart();
  const productsInCart = await Product.getAllByIds(cart.products.map((p) => p.id));
  const cartProducts = productsInCart.map((p) => {
    const product = cart.products.find((cp) => cp.id === p.id);
    return { ...p, qty: product?.qty || 0 };
  });

  res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', cart, cartProducts });
};

export const postCart: RequestHandler = async (req, res) => {
  const productId = Number(req.body.productId);
  const product = await Product.getById(productId);

  await Cart.addProduct(productId, product?.price || 0);

  res.redirect('/cart');
};

export const getCheckout: RequestHandler = (req, res) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
};

export const getOrders: RequestHandler = (req, res) => {
  res.render('shop/orders', { docTitle: 'Your orders', path: '/orders' });
};

export const postDeleteCartItem: RequestHandler = async (req, res) => {
  const productId = Number(req.body.productId);

  const product = await Product.getById(productId);
  await Cart.deleteProduct(productId, product?.price || 0);

  res.redirect('/cart');
};
