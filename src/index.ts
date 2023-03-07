import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import errorController from './controllers/errorController';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
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

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 - Not found
app.use(errorController.getNotFound);

// Start server
app.listen(3000);
