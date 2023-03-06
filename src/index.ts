import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import { router as adminRoutes } from './routes/admin';
import shopRoutes from './routes/shop';
import { rootDir } from './util/path';

const viewsPath = path.join(rootDir, '..', 'src', 'views');
const publicPath = path.join(rootDir, '..', 'public');

const app = express();

app.set('view engine', 'pug');
app.set('views', viewsPath);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { docTitle: 'Not found' });
});

app.listen(3000);
