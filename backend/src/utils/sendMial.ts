import mailer from "nodemailer";

type Options = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export const sendMail = async (options: Options) => {
  try {
    //1) transporter
    const transporter = await mailer.createTransport({
      service: "gmail",
      secure: process.env.NODE_ENV == "production",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    //2) email options
    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
    throw new Error("Could not send mail");
  }
};
