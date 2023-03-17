import { RequestHandler } from 'express';

export const getLogin: RequestHandler = (req, res) => {
  res.render('auth/login', { docTitle: 'Login', path: '/login' });
};
