import { INTEGER } from 'sequelize';
import sequelize from '../util/database';

const OrderItem = sequelize.define('orderItem', {
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

export default OrderItem;
