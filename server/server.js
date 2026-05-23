import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import"./security/passport.js";

// routers
import authRouter from "./Routes/authRouter.js";
import projectsRouter from "./Routes/projectsRouter.js";
import newsRouter from "./Routes/newsRouter.js";

// config
dotenv.config();

const app = express();

// ========================
// MIDDLEWARES
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// ========================
// DATABASE
// ========================
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1);
  }
};

// ========================
// ROUTES
// ========================
app.use("/", authRouter);
app.use("/api", projectsRouter);
app.use("/api", newsRouter);

// ========================
// 404
// ========================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ========================
// START
// ========================
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} ✅`);
});