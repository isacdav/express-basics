import { compareSync, hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { RequestHandler } from 'express';
import { User } from '../../models';
import { SendMailService } from '../../services';

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

  SendMailService.sendSignupEmail(email);

  req.session.user = user;
  req.session.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect('/');
};

export const getReset: RequestHandler = (req, res) => {
  const flash = req.flash('error');
  const message = flash.length > 0 ? flash[0] : null;

  res.render('auth/reset', { docTitle: 'Reset Password', path: '', errorMessage: message });
};

export const postReset: RequestHandler = async (req, res) => {
  const { email } = req.body;
  let token: string;

  try {
    token = randomBytes(32).toString('hex');

    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'No account with that email found');
      return res.redirect('/reset');
    }

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();

    SendMailService.sendResetPasswordEmail(email, token);

    res.redirect('/');
  } catch (err) {
    console.log(err);
    req.flash('error', 'An error occurred, try again later');
    return res.redirect('/reset');
  }
};

export const getNewPassword: RequestHandler = async (req, res) => {
  const { token } = req.params;

  const flash = req.flash('error');
  const message = flash.length > 0 ? flash[0] : null;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    req.flash('error', 'Your reset token is invalid or has expired');
    return res.redirect('/reset');
  }

  res.render('auth/new-password', {
    docTitle: 'New Password',
    path: '',
    token,
    userId: user._id.toString(),
    errorMessage: message,
  });
};

export const postNewPassword: RequestHandler = async (req, res) => {
  const { password, confirmPassword, userId, token } = req.body;

  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect(`reset/${token}`);
  }

  try {
    const user = await User.findOne({
      _id: userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      req.flash('error', 'Your reset token is invalid or has expired');
      return res.redirect('/reset');
    }

    const hashedPassword = await hash(password, 12);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    res.redirect('/login');
  } catch (err) {
    console.log(err);
    req.flash('error', 'An error occurred, try again later');
    return res.redirect('/reset');
  }
};
