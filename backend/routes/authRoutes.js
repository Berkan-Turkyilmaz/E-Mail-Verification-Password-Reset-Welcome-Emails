import express from "express";
import { forgotPassword, getAuthUserInfos, login, logout, resetPassword, signup, verifyEmail } from "../controllers/authControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRoutes = express.Router();

authRoutes.get("/check-auth",verifyToken, getAuthUserInfos)


authRoutes.post("/signup", signup )
authRoutes.post("/login", login )
authRoutes.post("/logout", logout )

authRoutes.post("/verify-email", verifyEmail)
authRoutes.post("/forgot-password", forgotPassword)
authRoutes.post("/reset-password/:token", resetPassword)





export default authRoutes;