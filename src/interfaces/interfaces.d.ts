import { Request } from 'express';
import { ObjectId } from 'mongodb';
import User from '../models/user';

// Req / Res interfaces
interface RequestAuth extends Request {
  user?: User;
}

// Product interfaces
interface ProductAttributes {
  _id?: ObjectId | undefined;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  userId: ObjectId;
}

// User interfaces
interface UserAttributes {
  _id?: ObjectId | undefined;
  name: string;
  email: string;
  cart?: CartAttributes;
}

// Cart interfaces
interface CartAttributes {
  items: CartItemAttributes[];
}

interface CartItemAttributes {
  productId: ObjectId;
  quantity: number;
}
