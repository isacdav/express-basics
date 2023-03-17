import { ObjectId } from 'mongodb';
import { CartAttributes, UserAttributes } from '../interfaces/interfaces';
import { getDb } from '../util/database';
import Product from './product';

class User implements UserAttributes {
  _id?: ObjectId;
  name: string;
  email: string;
  cart?: CartAttributes;

  constructor(name: string, email: string, cart?: CartAttributes, _id?: ObjectId | undefined) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    if (_id) this._id = new ObjectId(_id);
  }

  private async deleteProductsFromCartIfNotLongerExists() {
    const db = getDb();
    const cartProductIds = this.cart?.items.map((item) => item.productId);
    const products = await db
      .collection('products')
      .find({ _id: { $in: cartProductIds } })
      .toArray();

    const updatedCartItems = this.cart?.items.filter((item) => {
      const product = products.find((p) => p._id.toString() === item.productId.toString());
      return product;
    });

    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: updatedCartItems } } });
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart?.items.map((item) => item.productId);

    await this.deleteProductsFromCartIfNotLongerExists();

    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .map((product) => {
        return {
          ...product,
          quantity: this.cart?.items.find((item) => item.productId.toString() === product._id.toString())?.quantity,
        };
      })
      .toArray();
  }

  addToCart(product: Product) {
    const cartProductIndex = this.cart?.items.findIndex((cp) => cp.productId.toString() === product?._id?.toString());
    const updatedCartItems = [...(this.cart?.items || [])];
    let newQuantity = 1;

    if (cartProductIndex !== undefined && cartProductIndex >= 0) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  deleteFromCart(productId: string) {
    const updatedCartItems = this.cart?.items.filter((item) => item.productId.toString() !== productId);
    const db = getDb();
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: updatedCartItems } } });
  }

  async createOrder() {
    const db = getDb();

    const products = await this.getCart();
    const order = {
      items: products,
      user: {
        _id: new ObjectId(this._id),
        name: this.name,
        email: this.email,
      },
    };
    await db.collection('orders').insertOne(order);

    this.cart = { items: [] };
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  static getById(id: string) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  }
}

export default User;
