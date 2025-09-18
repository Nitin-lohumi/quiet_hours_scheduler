import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export default transport;
