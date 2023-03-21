import bodyParser from 'body-parser';
import mongodbSession from 'connect-mongodb-session';
import express, { Request } from 'express';
import session from 'express-session';
import path from 'path';
import { errorController } from './controllers';
import { User } from './models';
import { adminRoutes, authRoutes, shopRoutes } from './routes';
import { dbConnect, MONGO_CONNECTION_STRING, rootDir, SESSION_COLLECTION_NAME } from './util';

// Paths
const VIEWS_PATH = path.join(rootDir, '..', 'src', 'views');
const PUBLIC_PATH = path.join(rootDir, '..', 'public');

// Express app
const app = express();

// Session store
const MongoDBStore = mongodbSession(session);
const store = new MongoDBStore({
  uri: MONGO_CONNECTION_STRING,
  collection: SESSION_COLLECTION_NAME,
});

// View engine
app.set('view engine', 'pug');
app.set('views', VIEWS_PATH);

// Middlewares
app.use(express.static(PUBLIC_PATH));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ store, secret: 'secret key', resave: false, saveUninitialized: false }));

app.use(async (req: Request, res, next) => {
  if (!req.session.user) {
    return next();
  }

  const user = await User.findById(req.session?.user?._id);
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
