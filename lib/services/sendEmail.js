const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NM_EMAIL_USER,
    pass: process.env.NM_EMAIL_PW,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    to,
    subject,
    text,
  });
};

module.exports = { sendEmail };
