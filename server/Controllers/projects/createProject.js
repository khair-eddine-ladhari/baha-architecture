import Project from "../../Models/Projects.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export const createProject = async (req, res) => {
  try {
    const { title, location, description, year, category, buildings } = req.body;

    // 1. generate slug
    const slug = slugify(title, { lower: true, strict: true });

    // 2. check duplicate
    const existing = await Project.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Project title already exists" });
    }

    // 3. cover image — required
    if (!req.files?.cover_image?.[0]) {
      return res.status(400).json({ message: "Cover image is required" });
    }
    const coverResult = await cloudinary.uploader.upload(req.files.cover_image[0].path, {
      folder: "projects/covers",
    });
    fs.unlinkSync(req.files.cover_image[0].path);
    const cover_image = coverResult.secure_url; // ✅ plain string

    // 4. images — optional
    let images = [];
    if (req.files?.images?.length) {
      images = await Promise.all(
        req.files.images.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "projects/images",
          });
          fs.unlinkSync(file.path);
          return result.secure_url; // ✅ plain string
        })
      );
    }

    // 5. save to MongoDB
    const project = new Project({
      title,
      slug,
      location,
      description,
      year,
      category,
      buildings,
      cover_image,
      images,
      published: true,
    });

    await project.save();

    res.status(201).json({ message: "Project created successfully", project });

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};