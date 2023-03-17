/* eslint-disable @typescript-eslint/no-empty-interface */

import { Request } from 'express';
import {
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasOneCreateAssociationMixin,
  Model,
  Optional,
} from 'sequelize/types';

// Req / Res interfaces
interface RequestAuth extends Request {
  user?: UserInstance | null;
}

// Product interfaces
interface ProductAttributes {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}
interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes {
  cartItem: any;
  orderItem: any;
  // TODO: fix this - create types for cartItem and orderItem
  // cartItem: CartItemInstance[];
}

// User interfaces
interface UserAttributes {
  id: number;
  name: string;
  email: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  getCart: HasOneGetAssociationMixin<CartInstance>;
  getProducts: HasManyGetAssociationsMixin<ProductInstance>;
  createCart: HasOneCreateAssociationMixin<CartAttributes>;
  createProduct: HasManyCreateAssociationMixin<ProductAttributes, ProductInstance>;
  createOrder: HasManyCreateAssociationMixin<OrderInstance, OrderInstance['id']>;
  getOrders: HasManyGetAssociationsMixin<OrderInstance>;
}

// Cart interfaces
interface CartAttributes {
  id: number;
}
interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}
interface CartInstance extends Model<CartAttributes, CartCreationAttributes>, CartAttributes {
  getProducts: HasManyGetAssociationsMixin<ProductInstance>;
  addProduct: HasManyAddAssociationMixin<CartItemInstance, number>;
}

// Order interfaces
interface OrderAttributes {
  id: number;
}
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}
interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes {
  addProducts: HasManySetAssociationsMixin<ProductInstance, number>;
}

// CartItem interfaces
interface CartItemAttributes {
  id: number;
  quantity: number;
}
interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}
interface CartItemInstance extends Model<CartItemAttributes, CartItemCreationAttributes>, CartItemAttributes {
  product: ProductInstance;
}

// OrderItem interfaces
interface OrderItemAttributes {
  id: number;
  quantity: number;
}
interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}
interface OrderItemInstance extends Model<OrderItemAttributes, OrderItemCreationAttributes>, OrderItemAttributes {
  product: ProductInstance;
}
