import { INTEGER } from 'sequelize';
import sequelize from '../util/database';

const Cart = sequelize.define('cart', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Cart;
