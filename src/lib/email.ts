import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT || "587"),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email",
    html: `
      <p>Please click the link below to verify your email address:</p>
      <a href="${url}">${url}</a>
    `,
  });
}