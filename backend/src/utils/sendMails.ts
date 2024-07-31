import mailer, { Transport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Email sending configuration base on env
let host, port, pass, user, secure;
if (process.env.NODE_ENV === "production") {
  host = process.env.GMAIL_EMAIL_HOST;
  port = process.env.GMAIL_EMAIL_PORT;
  pass = process.env.GMAIL_EMAIL_PASSWORD;
  user = process.env.GMAIL_EMAIL_USER;
  secure = true;
} else {
  host = process.env.MAILTRAP_HOST;
  port = process.env.MAILTRAP_PORT;
  pass = process.env.MAILTRAP_EMAIL_PASSWORD;
  user = process.env.MAILTRAP_EMAIL_USERNAME;
  secure = false;
}

const transportOptions: SMTPTransport.Options = {
  host: host,
  port: parseInt(port || "587"),
  secure: secure,
  auth: {
    user: user,
    pass: pass,
  },
};

const transporter = mailer.createTransport(transportOptions);

interface EmailParams {
  recipientMail: string;
  subject: string;
  htmlContent: string;
}

export const sendMail = async (params: EmailParams) => {
  const { recipientMail, subject, htmlContent } = params;
  const sentFrom =
    process.env.NODE_ENV === "production"
      ? process.env.GMAIL_EMAIL_USER
      : process.env.MAILTRAP_EMAIL;
  try {
    await transporter.sendMail({
      from: sentFrom,
      to: recipientMail,

      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error(error);
    throw new Error("failed to send mail");
  }
};
