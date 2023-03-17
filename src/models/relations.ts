import Cart from './cart';
import CartItem from './cartItem';
import Order from './order';
import OrderItem from './orderItem';
import Product from './product';
import User from './user';

export const createRelations = () => {
  User.hasMany(Product);
  Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

  User.hasOne(Cart);
  Cart.belongsTo(User);

  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });

  Order.belongsTo(User);
  User.hasMany(Order);

  Order.belongsToMany(Product, { through: OrderItem });
  // Product.belongsToMany(Order, { through: OrderItem });
};
