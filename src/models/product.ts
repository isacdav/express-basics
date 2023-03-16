import { DOUBLE, INTEGER, STRING } from 'sequelize';
import { ProductInstance } from '../interfaces/interfaces';
import sequelize from '../util/database';

const Product = sequelize.define<ProductInstance>('product', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: STRING,
  price: {
    type: DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
});

export default Product;
