import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {
  sendEmailResetPassword,
  sendSuccessPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/userModel.js";
import crypto from "crypto";
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(402).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(Math.random() * 1000000).toString();
    const verificationCodeExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationCode,
      verificationCodeExpiresAt,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);
    sendVerificationEmail(email, verificationCode);
    newUser.password = null;
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("Server side", error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    generateTokenAndSetCookie(userExists._id, res);
    userExists.password = null;
    res
      .status(200)
      .json({ message: "User logged in successfully", user: userExists });
  } catch (error) {
    console.log("Server side error login", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Server side error", error.message);
  }
};
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationCode: code,
      verificationCodeExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;
    await user.save();

    sendWelcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ message: "Email verified successfully", user: user });
  } catch (error) {
    console.log("Server Side Error", error.message);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account with this email does not exist" });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
    await user.save();

    sendEmailResetPassword(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );
    console.log(process.env.CLIENT_URL);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.log("server side error", error.message);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Token is invalid or expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    await sendSuccessPasswordResetEmail(user.email);
    res.status(200).json("Password reset successfull");
  } catch (error) {
    console.log("server side error during password reset", error.message);
  }
};

export const getAuthUserInfos = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json("User not found");
    }

    res.status(200).json({ message: "Authorized User Infos:", user });
  } catch (error) {
    console.log("Server side error getAuthUserInfos", error.message);
  }
};
