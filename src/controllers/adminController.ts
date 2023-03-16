import { RequestHandler } from 'express';
import { ProductAttributes, RequestAuth } from '../interfaces/interfaces';
import Product from '../models/product';

export const getProducts: RequestHandler = async (req: RequestAuth, res) => {
  let products;

  try {
    products = await req.user?.getProducts();
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
    await req.user?.createProduct({ title, imageUrl, description, price });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/admin/products');
  }
};

export const getEditProduct: RequestHandler = async (req: RequestAuth, res) => {
  const productId = Number(req.params.productId);
  let product;

  try {
    const products = await req.user?.getProducts({ where: { id: productId } });
    product = products ? products[0] : null;
    if (!product) {
      return res.redirect('/admin/products');
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.render('admin/edit-product', { docTitle: 'Edit product', path: '/admin/products', editMode: true, product });
  }
};

export const postEditProduct: RequestHandler = async (req, res) => {
  const { id, title, imageUrl, description, price } = req.body as ProductAttributes;
  let product;

  try {
    product = await Product.findByPk(id);
    if (!product) {
      return res.redirect('/admin/products');
    }
    product.title = title;
    product.imageUrl = imageUrl;
    product.description = description;
    product.price = price;
    await product.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/admin/products');
  }
};

export const postDeleteProduct: RequestHandler = async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findByPk(productId);
  await product?.destroy();

  res.redirect('/admin/products');
};
