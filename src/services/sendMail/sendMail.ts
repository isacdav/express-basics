import nodemailer from 'nodemailer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_APY_KEY,
    },
  }),
);

export const sendSignupEmail = (email: string): void => {
  console.log(process.env.SENDGRID_APY_KEY);
  transporter.sendMail({
    to: email,
    from: 'fetaja6379@etondy.com',
    subject: 'Signup succeeded!',
    html: '<h1>You successfully signed up!</h1>',
  });
};

export const sendResetPasswordEmail = (email: string, token: string): void => {
  transporter.sendMail({
    to: email,
    from: 'fetaja6379@etondy.com',
    subject: 'Reset Password',
    html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://localhost:${process.env.PORT}/reset-password/${token}">link</a> to set a new password.</p>
    `,
  });
};
