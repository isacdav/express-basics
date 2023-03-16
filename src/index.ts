import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import errorController from './controllers/errorController';
import { RequestAuth } from './interfaces/interfaces';
import Cart from './models/cart';
import CartItem from './models/cartItem';
import Product from './models/product';
import User from './models/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import sequelize from './util/database';
import { rootDir } from './util/path';

// Paths
const VIEWS_PATH = path.join(rootDir, '..', 'src', 'views');
const PUBLIC_PATH = path.join(rootDir, '..', 'public');

// Express app
const app = express();

// View engine
app.set('view engine', 'pug');
app.set('views', VIEWS_PATH);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(PUBLIC_PATH));

app.use(async (req: RequestAuth, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 - Not found
app.use(errorController.getNotFound);

// DB Relations
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Sync database
// Temporarily create user
sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Isaac', email: 'isaac@mail.com' });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    // Start server if user is created
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
