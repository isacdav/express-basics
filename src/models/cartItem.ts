import { INTEGER } from 'sequelize';
import sequelize from '../util/database';

const CartItem = sequelize.define('cartItem', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: INTEGER,
  },
});

export default CartItem;
