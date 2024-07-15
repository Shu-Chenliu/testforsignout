import nodemailer from 'nodemailer';

// eslint-disable-next-line
export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: subject,
      html: html
    };
    transporter.sendMail(mailOptions, (error, info)=> {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}