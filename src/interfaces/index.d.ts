import { Request } from 'express';
import { Document, Model, Types } from 'mongoose';

// Req / Res interfaces
interface RequestAuth extends Request {
  user?: IUser & IUserMethods;
}

// Product interfaces
interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  userId: Types.ObjectId;
}

// User interfaces
interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  cart?: ICart;
}

interface IUserMethods {
  addToCart(product: IProduct): Promise<void>;
  deleteFromCart(productId: string): Promise<void>;
  clearCart(): Promise<void>;
}

type UserModel = Model<IUser, any, IUserMethods>;

// Cart interfaces
interface ICart {
  items: ICartItem[];
}

interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

// Order interfaces
interface IOrder extends Document {
  _id: Types.ObjectId;
  products: IOrderProduct[];
  user: IOrderUser;
}

interface IOrderProduct {
  product: IProduct;
  quantity: number;
}

interface IOrderUser {
  userId: Types.ObjectId;
  name: string;
  email: string;
}
