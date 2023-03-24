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
