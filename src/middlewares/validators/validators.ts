import { body } from 'express-validator';
import { User } from '../../models';

export const loginValitadationRules = () => {
  return [
    body('email', 'Email is required').isEmail().normalizeEmail(),
    body('password', 'Password is required').isLength({ min: 5 }).isAlphanumeric().trim(),
  ];
};

export const signupValidationRules = () => {
  return [
    body('email', 'Email is required')
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error('Email already exists');
        }
      }),

    body('password', 'Password is required and should be at least 5 characters')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),

    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
  ];
};
