import { NextFunction, Request, Response } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

export default isAuth;
