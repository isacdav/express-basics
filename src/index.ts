import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import errorController from './controllers/errorController';
import { RequestAuth } from './interfaces';
import User from './models/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import dbConnect from './util/database';
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
  const user = await User.findOne();
  req.user = user;
  next();
});

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 - Not found
app.use(errorController.getNotFound);

// Connect to database
dbConnect((success) => {
  if (success) {
    app.listen(3000);
  }
});
