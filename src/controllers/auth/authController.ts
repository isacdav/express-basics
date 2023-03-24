import { compareSync, hash } from 'bcryptjs';
import { RequestHandler } from 'express';
import { User } from '../../models';

export const getLogin: RequestHandler = (req, res) => {
  const flash = req.flash('error');
  const message = flash.length > 0 ? flash[0] : null;

  res.render('auth/login', { docTitle: 'Login', path: '/login', errorMessage: message });
};

export const postLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/login');
  }

  const isPasswordCorrect = compareSync(password, user.password);
  if (!isPasswordCorrect) {
    req.flash('error', 'Invalid email or password');
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
  const flash = req.flash('error');
  const message = flash.length > 0 ? flash[0] : null;

  res.render('auth/signup', { docTitle: 'Signup', path: '/signup', errorMessage: message });
};

export const postSignup: RequestHandler = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/signup');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    req.flash('error', 'Email already exists');
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
