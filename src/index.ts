import { urlencoded } from 'body-parser';
import { default as flash } from 'connect-flash';
import { default as mongodbSession } from 'connect-mongodb-session';
import { default as csusrf } from 'csurf';
import { default as dotenv } from 'dotenv';
import { default as express, static as expStatic } from 'express';
import { default as session } from 'express-session';
import { join } from 'path';
import { errorController } from './controllers';
import { User } from './models';
import { adminRoutes, authRoutes, shopRoutes } from './routes';
import { dbConnect, rootDir, SESSION_COLLECTION_NAME } from './util';

// Paths
const VIEWS_PATH = join(rootDir, '..', 'src', 'views');
const PUBLIC_PATH = join(rootDir, '..', 'public');

// Express app
const app = express();

// CSRF protect
const csrfProtection = csusrf();

// .env config
dotenv.config();

// Session store
const MongoDBStore = mongodbSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_CONN_STRING as string,
  collection: SESSION_COLLECTION_NAME,
});

// View engine
app.set('view engine', 'pug');
app.set('views', VIEWS_PATH);

// Middlewares
app.use(expStatic(PUBLIC_PATH));
app.use(urlencoded({ extended: false }));
app.use(session({ store, secret: 'secret key', resave: false, saveUninitialized: false }));
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  const user = await User.findById(req.session?.user?._id);
  req.user = user;
  next();
});

app.use(async (req, res, next) => {
  res.locals.isLogged = !!req.user;
  res.locals.csrfToken = req.csrfToken();
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
  const PORT = process.env.PORT || 3000;

  if (success) {
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  }
});
