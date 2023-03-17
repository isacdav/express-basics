import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import errorController from './controllers/errorController';
import { RequestAuth } from './interfaces/interfaces';
import User from './models/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import mongoConnect from './util/database';
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
  const user = await User.getById('6413dc1b8a25a035c1717a8d');
  req.user = new User(user?.name, user?.email, user?.cart, user?._id);
  next();
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 - Not found
app.use(errorController.getNotFound);

// DB connection
mongoConnect((success: boolean) => {
  if (success) {
    app.listen(3000);
  }
});
