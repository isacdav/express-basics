import { RequestHandler } from 'express';
import { ProductInstance, RequestAuth } from '../interfaces/interfaces';
import Product from '../models/product';

export const getIndex: RequestHandler = async (req, res) => {
  let products;

  try {
    products = await Product.findAll();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/index', { products, docTitle: 'Shop', path: '/' });
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  let products;

  try {
    products = await Product.findAll();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/product-list', { products, docTitle: 'All products', path: '/products' });
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  const productId = Number(req.params.productId);
  let product;

  try {
    product = await Product.findByPk(productId);
  } catch (error) {
    console.log(error);
  } finally {
    res.render('shop/product-detail', { product, docTitle: product?.title, path: '/products' });
  }
};

export const getCart: RequestHandler = async (req: RequestAuth, res) => {
  let cart;
  let cartProducts;

  try {
    cart = await req.user?.getCart();
    cartProducts = await cart?.getProducts();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('shop/cart', { docTitle: 'Your cart', path: '/cart', cart, cartProducts });
  }
};

export const postCart: RequestHandler = async (req: RequestAuth, res) => {
  const productId = Number(req.body.productId);
  let cart;
  let productsInCart;

  try {
    cart = await req.user?.getCart();
    productsInCart = await cart?.getProducts({ where: { id: productId } });

    if (productsInCart && productsInCart.length > 0) {
      const product = productsInCart[0];
      const oldQuantity = product.cartItem?.quantity || 0;
      const newQuantity = oldQuantity + 1;
      await product.cartItem?.update({ quantity: newQuantity });
    } else {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.redirect('/cart');
      }
      await cart?.addProduct(product, { through: { quantity: 1 } });
    }
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
    orders = await req.user?.getOrders({ include: ['products'] });
  } catch (error) {
    console.log(error);
  } finally {
    res.render('shop/orders', { docTitle: 'Your orders', path: '/orders', orders });
  }
};

export const postDeleteCartItem: RequestHandler = async (req: RequestAuth, res) => {
  const productId = Number(req.body.productId);

  try {
    const productInCart = await req.user?.getCart();
    const products = await productInCart?.getProducts({ where: { id: productId } });
    const product = products ? products[0] : null;

    await product?.cartItem?.destroy();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/cart');
  }
};

export const postOrder: RequestHandler = async (req: RequestAuth, res) => {
  let cart;
  let productsInCart;

  try {
    cart = await req.user?.getCart();
    productsInCart = await cart?.getProducts();

    const order = await req.user?.createOrder();
    await order?.addProducts(
      productsInCart?.map((product: ProductInstance) => {
        product.orderItem = { quantity: product.cartItem?.quantity };
        return product;
      }),
    );

    await cart?.setProducts(null);
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/orders');
  }
};
