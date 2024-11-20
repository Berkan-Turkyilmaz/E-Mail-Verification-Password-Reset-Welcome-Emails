import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();
const TOKEN = "f00491df49455ffc1756d2cbea7f0cdc";
export const client = new MailtrapClient({ token: TOKEN });

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Berkan",
};

