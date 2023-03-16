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
interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes {}

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
}

// Cart interfaces
interface CartAttributes {
  id: number;
}
interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}
interface CartInstance extends Model<CartAttributes, CartCreationAttributes>, CartAttributes {
  getProducts: HasManyGetAssociationsMixin<ProductInstance>;
  addProduct: HasManyAddAssociationMixin<ProductInstance, number>;
}
