import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.resolve();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors()
);

const PORT = process.env.PORT || 3000;

app.use("/api/auth/", authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  }

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();  
});
