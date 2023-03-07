import { RequestHandler } from 'express';

const getNotFound: RequestHandler = (req, res) => {
  res.status(404).render('errors/404', { docTitle: 'Not found', path: '404' });
};

export default { getNotFound };
