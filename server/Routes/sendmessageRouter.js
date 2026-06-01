// just login route
import express from "express";

import { validateMessage } from "../Validators/messagevalidator.js";
import sendMessage from "../Controllers/auth/sendMessage.js";
import getmessagesbyadmin from "../Controllers/auth/getmessagesbyadmin.js";
import deletemessagesbyadmin from "../Controllers/auth/deletemessagesbyadmin.js";
import passport from "passport";
import RolesMiddleware from "../security/RoleMiddleware.js";
const router = express.Router();


const adminAuth = [
  passport.authenticate('jwt', { session: false }),
  RolesMiddleware(['admin'])
];


router.post("/messages", validateMessage, sendMessage);

router.get("/admin/messages", ...adminAuth, getmessagesbyadmin);

router.delete("/admin/messages/:id", ...adminAuth, deletemessagesbyadmin);

export default router;