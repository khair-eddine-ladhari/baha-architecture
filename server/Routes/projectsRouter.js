// all project routes
import express from "express";
import passport from "passport";
import upload from "../config/multer.js";
import RolesMiddleware from "../security/RoleMiddleware.js";

import { getProjects } from "../Controllers/projects/getProjects.js";
import { getProjectBySlug } from "../Controllers/projects/getProjectBySlug.js";
import { createProject } from "../Controllers/projects/createProject.js";
import { updateProject } from "../Controllers/projects/updateProject.js";
import { deleteProject } from "../Controllers/projects/deleteProject.js";
import { uploadProjectImages } from "../Controllers/projects/uploadProjectImages.js";
import { deleteProjectImage } from "../Controllers/projects/deleteProjectImage.js";

import { createProjectValidator, updateProjectValidator } from "../Validators/projectValidator.js";
import { admindashboard } from "../Controllers/projects/admindashboard.js";
const router = express.Router();

const adminAuth = [
  passport.authenticate('jwt', { session: false }),
  RolesMiddleware(['admin'])
];

// ========================
// PUBLIC
// ========================
router.get("/projects", getProjects);
router.get("/projects/:slug", getProjectBySlug);

// building in th work page )

import { getBuildings, getindex, getProjectswork } from "../Controllers/projects/getProjects.js";


router.get("/buildings", getBuildings);
router.get("/index", getindex);
router.get("/projectswork", getProjectswork);

// ========================
// ADMIN
// ========================




router.post("/admin",
  ...adminAuth,
 admindashboard
);



router.post("/admin/projects",
  ...adminAuth,
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  createProjectValidator,
  createProject
);





router.put("/admin/projects/:id",
  ...adminAuth,
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updateProjectValidator,
  updateProject
);





router.delete("/admin/projects/:id", ...adminAuth, deleteProject);

router.post("/admin/projects/:id/images",
  ...adminAuth,
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadProjectImages
);

router.delete("/admin/projects/:id/images/:imageId", ...adminAuth, deleteProjectImage);

export default router;