import { INTEGER } from 'sequelize';
import sequelize from '../util/database';

const Order = sequelize.define('order', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default Order;
