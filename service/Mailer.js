import { createTransport } from "nodemailer";
import { EMAIL_SERVICE_KEY, EMAIL_SERVICE_USER } from "../config";

const transporter = createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: EMAIL_SERVICE_USER,
    pass: EMAIL_SERVICE_KEY,
  },
});

async function sendMail(to, subject, text) {
  return transporter.sendMail({ from: EMAIL_SERVICE_USER, to, subject, text });
}

export { sendMail };
