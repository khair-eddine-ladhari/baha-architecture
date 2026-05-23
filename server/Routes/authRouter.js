// just login route
import express from "express";
import { Login } from "../Controllers/auth/Login.js";
import { loginValidator } from "../Validators/loginValidator.js";

const router = express.Router();

router.post("/login", loginValidator, Login);

export default router;