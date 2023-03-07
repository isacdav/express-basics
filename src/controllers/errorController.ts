import { RequestHandler } from 'express';

const getNotFound: RequestHandler = (req, res) => {
  res.status(404).render('404', { docTitle: 'Not found' });
};

export default { getNotFound };
