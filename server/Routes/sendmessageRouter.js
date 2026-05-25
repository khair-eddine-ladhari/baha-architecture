// just login route
import express from "express";

import { validateMessage } from "../Validators/messagevalidator.js";
import sendMessage from "../Controllers/auth/sendMessage.js";

const router = express.Router();

router.post("/", validateMessage, sendMessage);

export default router;