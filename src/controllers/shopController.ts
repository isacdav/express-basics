import { RequestHandler } from 'express';
import { IProduct, RequestAuth } from '../interfaces';
import Order from '../models/order';
import Product from '../models/product';

export const getIndex: RequestHandler = async (req, res) => {
  let products: IProduct[] = [];

  try {
    products = await Product.find();
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
    const productResult = await Product.findById(productId);
    if (!productResult) {
      return res.redirect('/');
    }
    product = productResult;
  } catch (error) {
    console.error(error);
  } finally {
    res.render('shop/product-detail', { product, docTitle: product?.title, path: '/' });
  }
};

export const getCart: RequestHandler = async (req: RequestAuth, res) => {
  let cartProducts;

  try {
    const userInfo = await req.user?.populate('cart.items.productId');
    cartProducts = userInfo?.cart?.items;
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', cartProducts });
  }
};

export const postCart: RequestHandler = async (req: RequestAuth, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.redirect('/');
    }
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
    orders = await Order.find({ 'user.userId': req.user?._id });
  } catch (error) {
    console.log(error);
  } finally {
    res.render('shop/orders', { docTitle: 'Your orders', path: '/orders', orders });
  }
};

export const postOrder: RequestHandler = async (req: RequestAuth, res) => {
  try {
    const userInfo = await req.user?.populate('cart.items.productId');
    const products = userInfo?.cart?.items.map((item) => ({ quantity: item.quantity, product: { ...item.productId } }));

    const order = new Order({
      user: {
        userId: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
      products,
    });

    await order.save();
    await req.user?.clearCart();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/orders');
  }
};
