import { compareSync, hash } from 'bcryptjs';
import { RequestHandler } from 'express';
import { User } from '../../models';

export const getLogin: RequestHandler = (req, res) => {
  res.render('auth/login', { docTitle: 'Login', path: '/login' });
};

export const postLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect('/login');
  }

  const isPasswordCorrect = compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.redirect('/login');
  }

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
  res.render('auth/signup', { docTitle: 'Signup', path: '/signup' });
};

export const postSignup: RequestHandler = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.redirect('/signup');
  }

  const hashedPassword = await hash(password, 12);

  const user = new User({ email, password: hashedPassword, cart: { items: [] } });
  await user.save();

  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect('/');
};
