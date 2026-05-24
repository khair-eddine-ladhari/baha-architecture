import Project from "../../Models/Projects.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export const createProject = async (req, res) => {
  try {
    const { title, location, description, year, category } = req.body;

    // 1. generate slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    // 2. check if slug already exists
    const existing = await Project.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Project title already exists" });
    }

    // 3. upload cover image to cloudinary
    const coverResult = await cloudinary.uploader.upload(req.files.cover_image[0].path, {
      folder: "projects/covers",
    });
    // delete temp cover file
    fs.unlinkSync(req.files.cover_image[0].path);

    // 4. upload all images to cloudinary
    const images = await Promise.all(
      req.files.images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "projects/images",
        });
        // delete temp file
        fs.unlinkSync(file.path);
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    // 5. save project to MongoDB
    const project = new Project({
      title,
      slug,
      location,
      description,
      year,
      category,
      cover_image: {
        url: coverResult.secure_url,       // ✅ save url
        public_id: coverResult.public_id   // ✅ save public_id
      },
      images,
      published: true,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};