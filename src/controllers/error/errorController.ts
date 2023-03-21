import { RequestHandler } from 'express';

export const getNotFound: RequestHandler = (req, res) => {
  res.status(404).render('errors/404', { docTitle: 'Not found', path: '404', isLogged: !!req.session.user });
};
