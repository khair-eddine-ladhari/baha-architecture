// all project routes
import express from "express";
import passport from "passport";

import { getProjects } from "../Controllers/projects/getProjects.js";
import { getProjectBySlug } from "../Controllers/projects/getProjectBySlug.js";
import { createProject } from "../Controllers/projects/createProject.js";
import { updateProject } from "../Controllers/projects/updateProject.js";
import { deleteProject } from "../Controllers/projects/deleteProject.js";
import RolesMiddleware from "../security/RoleMiddleware.js";
import upload from "../config/multer.js";  // ← add this


import { createProjectValidator, updateProjectValidator } from "../Validators/projectValidator.js";
import { createNewsValidator, updateNewsValidator } from "../Validators/newsValidator.js";



const router = express.Router();

const adminAuth = [
  passport.authenticate('jwt', { session: false }),
  
  RolesMiddleware(['admin'])
];

// public
router.get("/projects", getProjects);
router.get("/projects/:slug", getProjectBySlug);

// admin only

router.delete("/admin/projects/:id", ...adminAuth, deleteProject);















// projects
router.post("/admin/projects",
  ...adminAuth,
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createProjectValidator,  // ← validate here
  createProject
);

router.put("/admin/projects/:id",
  ...adminAuth,
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProjectValidator,  // ← validate here
  updateProject
);







export default router;