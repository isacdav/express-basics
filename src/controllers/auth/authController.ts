import { RequestHandler } from 'express';
import { User } from '../../models';

export const getLogin: RequestHandler = (req, res) => {
  res.render('auth/login', { docTitle: 'Login', path: '/login', isLogged: !!req.user });
};

export const postLogin: RequestHandler = async (req, res) => {
  const user = await User.findOne();
  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect('/');
};

export const postLogout: RequestHandler = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

export const getSignup: RequestHandler = (req, res) => {
  res.render('auth/signup', { docTitle: 'Signup', path: '/signup', isLogged: !!req.user });
};

export const postSignup: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = new User(email, password);
  await user.save();

  res.redirect('/login');
};
