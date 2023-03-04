import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import { rootDir } from './util/path';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, '..', 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', 'notFound.html'));
});

app.listen(3000);
