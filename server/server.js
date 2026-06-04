import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import passport from "passport";
import "./security/passport.js";

// routers & controllers
import authRouter from "./Routes/authRouter.js";
import projectsRouter from "./Routes/projectsRouter.js";
import newsRouter from "./Routes/newsRouter.js";
import messageRouter from "./Routes/sendmessageRouter.js";
import { Login } from "./Controllers/auth/Login.js";
import { loginValidator } from "./validators/loginValidator.js";
import { countVisitor } from "./Rolemiddleware/visitorCounter.js";
import getVisitorCount from "./Controllers/getVisitorCount.js";




// ✅ add after express.json()










// ========================
// CONFIG
// ========================
dotenv.config();
const app = express();

// ========================
// SECURITY

// ========================


// ✅ limit JSON body size
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later" },
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, please try again later" },
});




















// ========================
// MIDDLEWARES
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// ========================
// DATABASE
// ========================
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing");
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
app.post("/login", authLimiter, loginValidator, Login);
app.use("/", authRouter);
app.use("/api", projectsRouter);
app.use("/api", newsRouter);
app.use("/api", messageRouter);
app.get("/api/visitors", getVisitorCount);
app.post("/api/visitors/track", countVisitor, (req, res) => {
  res.status(204).end();
});

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