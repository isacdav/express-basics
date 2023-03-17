import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { errorController } from './controllers';
import { RequestAuth } from './interfaces';
import { User } from './models';
import { adminRoutes, authRoutes, shopRoutes } from './routes';
import { dbConnect, rootDir } from './util';

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
app.use(authRoutes);
app.use(shopRoutes);

// 404 - Not found
app.use(errorController.getNotFound);

// Connect to database
dbConnect((success) => {
  if (success) {
    app.listen(3000);
  }
});
