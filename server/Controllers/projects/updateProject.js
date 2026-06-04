import Project from "../../Models/Projects.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, year, category, buildings } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // cover image — use new file if uploaded, else keep existing
    let cover_image = project.cover_image;
    if (req.files?.cover_image?.[0]) {
      const coverResult = await cloudinary.uploader.upload(req.files.cover_image[0].path, {
        folder: "projects/covers",
      });
      fs.unlinkSync(req.files.cover_image[0].path);
      cover_image = coverResult.secure_url; // ✅ plain string
    }

    // images — use new files if uploaded, else keep existing
   // ✅ replace with this
const existing_images = req.body.existing_images
  ? JSON.parse(req.body.existing_images)
  : project.images;

let newImages = [];
if (req.files?.images?.length) {
  newImages = await Promise.all(
    req.files.images.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "projects/images",
      });
      fs.unlinkSync(file.path);
      return result.secure_url;
    })
  );
}

const images = [...existing_images, ...newImages];

    // update fields
    project.title = title || project.title;
    project.slug = title ? slugify(title, { lower: true, strict: true }) : project.slug;
    project.location = location || project.location;
    project.description = description || project.description;
    project.year = year || project.year;
    project.category = category || project.category;
    project.buildings = buildings || project.buildings;
    project.cover_image = cover_image;
    project.images = images;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};