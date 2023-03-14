import { RequestHandler } from 'express';
import Product from '../models/product';

export const getProducts: RequestHandler = async (req, res) => {
  const products = await Product.getAll();

  res.render('admin/products', { products, docTitle: 'Admin products', path: '/admin/products' });
};

export const getAddProduct: RequestHandler = (req, res) => {
  res.render('admin/edit-product', { docTitle: 'Add product', path: '/admin/add-product', editMode: false });
};

export const postAddProduct: RequestHandler = async (req, res) => {
  const { title, imageUrl, description, price } = req.body as IProduct;

  const product = new Product(undefined, title, imageUrl, description, price);
  await product.save();

  res.redirect('/admin/products');
};

export const getEditProduct: RequestHandler = async (req, res) => {
  const productId = Number(req.params.productId);

  const product = await Product.getById(productId);

  if (!product) {
    return res.redirect('/');
  }

  res.render('admin/edit-product', { docTitle: 'Edit product', path: '/admin/products', editMode: true, product });
};

export const postEditProduct: RequestHandler = async (req, res) => {
  const { id, title, imageUrl, description, price } = req.body as IProduct;

  const product = new Product(Number(id), title, imageUrl, description, price);
  await product.save();

  res.redirect('/admin/products');
};

export const postDeleteProduct: RequestHandler = async (req, res) => {
  const { productId } = req.body;

  await Product.deleteById(Number(productId));

  res.redirect('/admin/products');
};
