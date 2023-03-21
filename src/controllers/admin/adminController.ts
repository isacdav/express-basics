import { RequestHandler } from 'express';
import { IProduct } from '../../interfaces';
import { Product, User } from '../../models';

export const getProducts: RequestHandler = async (req, res) => {
  let products: IProduct[] = [];

  try {
    products = await Product.find();
  } catch (err) {
    console.log(err);
  } finally {
    res.render('admin/products', {
      products,
      docTitle: 'Admin products',
      path: '/admin/products',
      isLogged: !!req.user,
    });
  }
};

export const getAddProduct: RequestHandler = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Add product',
    path: '/admin/products',
    editMode: false,
    isLogged: !!req.user,
  });
};

export const postAddProduct: RequestHandler = async (req, res) => {
  const { title, imageUrl, description, price } = req.body;

  try {
    const product = new Product({ title, imageUrl, description, price, userId: req.user?._id });
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
    product = await Product.findById(productId);
    if (!product) {
      return res.redirect('/admin/products');
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.render('admin/edit-product', {
      docTitle: 'Edit product',
      path: '/admin/products',
      editMode: true,
      product,
      isLogged: !!req.user,
    });
  }
};

export const postEditProduct: RequestHandler = async (req, res) => {
  const { productId, title, imageUrl, description, price } = req.body;

  try {
    const product = await Product.findById(productId);
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

  try {
    await Product.findByIdAndDelete(productId);
    await User.updateMany({}, { $pull: { 'cart.items': { productId } } });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/admin/products');
  }
};
