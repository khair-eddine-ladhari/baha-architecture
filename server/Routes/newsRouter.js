// all news routes
import express from "express";
import passport from "passport";

import { getNews } from "../Controllers/news/getNews.js";
import { getNewsById } from "../Controllers/news/getNewsById.js";
import { createNews } from "../Controllers/news/createNews.js";
import { updateNews } from "../Controllers/news/updateNews.js";
import { deleteNews } from "../Controllers/news/deleteNews.js";
import RolesMiddleware from "../security/RoleMiddleware.js";
import {updateNewsValidator,createNewsValidator} from "../validators/newsValidator.js"
const router = express.Router();

const adminAuth = [
  passport.authenticate('jwt', { session: false }),
  RolesMiddleware(['admin'])
];

// public
router.get("/news", getNews);


// admin only

router.delete("/admin/news/:id", ...adminAuth, deleteNews);






// news
router.post("/admin/news",
  ...adminAuth,
  createNewsValidator,     // ← validate here
  createNews
);


router.post("/admin/news",
  ...adminAuth,
  createNewsValidator,     // ← validate here
  createNews
);

router.patch("/admin/news/:id",
  ...adminAuth,
  updateNewsValidator,     // ← validate here
  updateNews
);

export default router;