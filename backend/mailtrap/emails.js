import { resetPasswordTemplate } from "./emailTemplate.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const recipient = [{ email }];

    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Email Verification",
      text: `Your verification code is ${verificationCode}`,
    });
  } catch (error) {
    console.log("Server Side Error", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "01958fcc-743d-495d-92e5-0ee4fa497cf0",
      template_variables: {
        company_info_name: "BB Design",
        name: name,
      },
    });
    console.log("Successfully sent email", response);
  } catch (error) {
    console.error("Server Side Error", error.message);
  }
};

export const sendEmailResetPassword = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: resetPasswordTemplate(email, resetURL),
    });
    console.log("successfully sent email", response);
  } catch (error) {
    console.log("server side error", error.message);
  }
};

export const sendSuccessPasswordResetEmail = async (email) => {
  const recipient = [{ email }];
  try {
    client.send({
      from: sender,
      to: recipient,
      template_uuid: "f0db2b54-7b85-492a-82b4-43e440af2146",
      template_variables: {
        company_info_name: "BB Design",
      },
    });
    console.log("Success mail sent!")
  } catch (error) {
    console.log("Server side error", error.message)
  }
};
