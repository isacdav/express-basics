import { RequestHandler } from 'express';
import { ProductAttributes, RequestAuth } from '../interfaces/interfaces';
import Product from '../models/product';

export const getProducts: RequestHandler = async (req, res) => {
  let products;

  try {
    products = await Product.getAll();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('admin/products', { products, docTitle: 'Admin products', path: '/admin/products' });
  }
};

export const getAddProduct: RequestHandler = (req, res) => {
  res.render('admin/edit-product', { docTitle: 'Add product', path: '/admin/add-product', editMode: false });
};

export const postAddProduct: RequestHandler = async (req: RequestAuth, res) => {
  const { title, imageUrl, description, price } = req.body as ProductAttributes;

  try {
    const product = new Product(title, imageUrl, description, price, req.user?._id);
    await product.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/admin/products');
  }
};

export const getEditProduct: RequestHandler = async (req, res) => {
  const productId = req.params.productId;
  let product;

  try {
    product = await Product.getById(productId);
    if (!product) {
      return res.redirect('/admin/products');
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.render('admin/edit-product', { docTitle: 'Edit product', path: '/admin/products', editMode: true, product });
  }
};

export const postEditProduct: RequestHandler = async (req: RequestAuth, res) => {
  const { _id, title, imageUrl, description, price } = req.body as ProductAttributes;

  try {
    const product = new Product(title, imageUrl, description, price, req.user?._id, _id);
    await product.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/admin/products');
  }
};

export const postDeleteProduct: RequestHandler = async (req, res) => {
  const { productId } = req.body;

  try {
    await Product.deleteById(productId);
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/admin/products');
  }
};
